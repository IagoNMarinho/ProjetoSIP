import { initializeApp, FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

// Protege as credenciais em variáveis de ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Inicializa o Firebase
const conexao = initializeApp(firebaseConfig);

// Habilita o serviço de Autenticação
const autenticacao = getAuth(conexao);

// Habilita o serviço de Banco de Dados (Firestore)
export const bancoDados = getFirestore(conexao);

// Habilita o serviço de armazenamento de arquivos 
export const armazenamento = getStorage(conexao);

// Disponibiliza o serviço de autenticação para o resto do app
export { autenticacao };

export function FirebaseConexao() {
  // Mensagem exibida enquanto a verificação ainda não terminou
  const [mensagemErro, setMensagemErro] = useState("Verificando conexão...");

  // Indica se a conexão com o Firebase foi confirmada com sucesso
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    // onAuthStateChanged recebe 3 parâmetros:
    // 1) a instância de autenticação
    // 2) callback de sucesso, chamado sempre que o estado de login muda
    //    (inclusive na primeira verificação, mesmo sem ninguém logado)
    // 3) callback de erro, chamado só se algo realmente falhar
    //    (ex: chave de API inválida, projeto mal configurado, sem rede)
    const cancelarListener = onAuthStateChanged(
      autenticacao,

      () => {
        // Chegou aqui = o Firebase respondeu normalmente.
        // Não importa se existe um usuário logado ou não - só o fato de
        // o SDK conseguir determinar isso já confirma que a conexão está OK.
        setConectado(true);
      },

      (error) => {
        // Confirma que é um erro específico do Firebase (garante que "code" existe)
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
              setMensagemErro("Chave de API do Firebase inválida!");
              break;

            case "auth/network-request-failed":
              setMensagemErro("Falha de rede! Verifique sua internet.");
              break;

            case "auth/too-many-requests":
              setMensagemErro(
                "IP bloqueado temporariamente por excesso de tentativas (aguarde alguns minutos).",
              );
              break;

            default:
              setMensagemErro(`Erro do Firebase: ${error.code}`);
              break;
          }
        } else {
          // Erro que não veio do Firebase (bem raro nesse contexto, mas cobre o caso)
          setMensagemErro(`Erro imprevisto! (${error})`);
        }

        setConectado(false);
      },
    );

    // Cancela o listener quando o componente é desmontado,aa
    // evitando vazamento de memória (memory leak)
    return () => cancelarListener();
  }, []);

  // Enquanto conectado, não precisamos renderizar nada visualmente -
  // só deixamos um rastro no console para fins de depuração.
  if (conectado) {
    console.log(mensagemErro);
    return null;
  }

  // Se ainda não conectou (ou deu erro), mostramos a tela de status/erro.
  // Isso também cobre o instante inicial, antes do listener responder -
  // mas como onAuthStateChanged costuma ser bem rápido, o "flash" de tela
  // tende a ser bem mais curto 
  return (
      <div style={{ display: "none" }}>
        {mensagemErro}
      </div>
  );
}
