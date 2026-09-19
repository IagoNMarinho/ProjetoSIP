import { FirebaseError } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithCredential,} from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, query, collection, where}from "firebase/firestore";
import { autenticacao, bancoDados } from "../firebase/FirebaseConexao";

// As funções de autenticação serão disponibilizadas como um Custom Hook
export function useAutenticacao() {
  // Responsável por cadastrar o usuário no Firebase Authentication
  // e salvar seus demais dados no Cloud Firestore
  const cadastrarUsuario = async (
    email: string,
    senha: string,
    dados: {
      nome: string;
      dataNas: string;
      username: string;
      cpf: string;
      telefone: string;
    },
  ): Promise<string> => {
    try {
      // Cria a conta no Firebase Authentication
      const credencial = await createUserWithEmailAndPassword(
        autenticacao,
        email,
        senha,
      );

      // Obtém o UID gerado pelo Firebase Authentication
      const uid = credencial.user.uid;

      // Salva os dados adicionais do usuário no Firestore
      await setDoc(doc(bancoDados, "usuarios", uid), {
        nome: dados.nome,
        dataNas: dados.dataNas,
        username: dados.username,
        cpf: dados.cpf,
        telefone: dados.telefone,
        email: email,
        picture: "",
        tipo: "usuario",
      });
      return "sucesso";
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            return `E-mail já utilizado por outra conta. (${error.code})`;

          case "auth/weak-password":
            return `A senha informada é muito fraca. (${error.code})`;

          case "auth/invalid-email":
            return `O e-mail informado é inválido. (${error.code})`;

          default:
            return `Erro no cadastro! (${error.code}: ${error.message})`;
        }
      }
      return `Erro imprevisto! (${error})`;
    }
  };

  const cadastrarInstituicao = async (
    email: string,
    senha: string,
    dados: { nome: string; cnpj: string; telefone: string; codigo: string },
  ): Promise<string> => {
    try {
      // Cria a conta no Firebase Authentication
      const credencial = await createUserWithEmailAndPassword(
        autenticacao,
        email,
        senha,
      );

      // Obtém o UID gerado pelo Firebase Authentication
      const uid = credencial.user.uid;

      // Salva os dados adicionais do usuário no Firestore
      await setDoc(doc(bancoDados, "instituicoes", uid), {
        nome: dados.nome,
        cnpj: dados.cnpj,
        picture: "",
        telefone: dados.telefone,
        codigo: dados.codigo,
        email: email,
        tipo: "instituicao",
      });
      return "sucesso";
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            return `E-mail já utilizado por outra conta. (${error.code})`;

          case "auth/weak-password":
            return `A senha informada é muito fraca. (${error.code})`;

          case "auth/invalid-email":
            return `O e-mail informado é inválido. (${error.code})`;

          default:
            return `Erro no cadastro! (${error.code}: ${error.message})`;
        }
      }
      return `Erro imprevisto! (${error})`;
    }
  };

  // Responsável por realizar o login do usuário
  const validarUsuario = async (
    email: string,
    senha: string,
    tipo: "usuario" | "instituicao",
  ): Promise<string> => {
    let retorno = "sucesso";
    try {
      // Verifica se o e-mail e a senha correspondem a uma conta
      const credencial = await signInWithEmailAndPassword(
        autenticacao,
        email,
        senha,
      );
      const uid = credencial.user.uid;

      //verifica em qual coleção está o cadastro
      const colecao = tipo === "usuario" ? "usuarios" : "instituicoes";

      const documento = await getDoc(doc(bancoDados, colecao, uid));
      // Caso não exista cadastro nessa categoria
      if (!documento.exists()) {
        await signOut(autenticacao);
        return "A conta não pertence ao tipo de acesso selecionado.";
      }

      return "sucesso";
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          default:
            retorno = `Erro na autenticação do usuário! (${error.code}: ${error.message})`;
            break;
        }
      } else {
        retorno = `Erro imprevisto! (${error})`;
      }
    }
    return retorno;
  };

  // Responsável por realizar o logout do usuário
  const deslogar = async (): Promise<string> => {
    let retorno = "sucesso";
    try {
      await signOut(autenticacao);
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          default:
            retorno = `Erro ao deslogar o usuário! (${error.code}: ${error.message})`;
            break;
        }
      } else {
        retorno = `Erro imprevisto! (${error})`;
      }
    }
    return retorno;
  };

  const loginComGoogle = async (tokenGoogle: string): Promise<string> => {
    try {
      // Transforma o ID token do Google em uma credencial do Firebase
      const credentialGoogle = GoogleAuthProvider.credential(tokenGoogle);

      // Realiza a autenticação no Firebase
      const credencial = await signInWithCredential(autenticacao,credentialGoogle,);

      const usuario = credencial.user;
      const uid = usuario.uid;
      const email = usuario.email ?? "";

      // Verifica se já existe um documento de usuário cadastrado com este e-mail
      if (email) {
         const consultaEmail = query(collection(bancoDados, "usuarios"),where("email", "==", email),);
         const resultado = await getDocs(consultaEmail);
         const contaComOutroUid = resultado.docs.find((d) => d.id !== uid);

         if (contaComOutroUid) {
           // Já existe cadastro com esse e-mail feito de outra forma.
           // Remove a conta duplicada que o Firebase acabou de criar
           // no Authentication, evitando dois UIDs para o mesmo e-mail.
           try {
             await usuario.delete();
           } catch {
             await signOut(autenticacao);
           }
           return `Este e-mail já possui um cadastro. Faça login com e-mail e senha.`;
         }
       }

      // Verifica se o usuário já possui cadastro no Firestore
      const referenciaUsuario = doc(bancoDados, "usuarios", uid);

      const documentoUsuario = await getDoc(referenciaUsuario);

      // Se for o primeiro login com Google, cria o documento
      if (!documentoUsuario.exists()) {
        await setDoc(referenciaUsuario, {
          nome: usuario.displayName ?? "",
          email: usuario.email ?? "",
          picture: usuario.photoURL ?? "",
          tipo: "usuario",

          // Dados que poderão ser preenchidos posteriormente
          dataNas: "",
          username: "",
          cpf: "",
          telefone: "",
        });
      }

      return "sucesso";
    } catch (error) {
      if (error instanceof FirebaseError) {
        return `Erro na autenticação com Google! (${error.code}: ${error.message})`;
      }

      return `Erro imprevisto! (${error})`;
    }
  };

  return {
    cadastrarUsuario,
    cadastrarInstituicao,
    validarUsuario,
    deslogar,
    loginComGoogle,
  };
}
