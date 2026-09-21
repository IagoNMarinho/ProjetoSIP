/*
O React Hook Form controla os campos e captura os dados,
enquanto o Zod valida se esses dados seguem as regras definidas.

Se estiver tudo correto, o formulário envia os dados;
se não, ele bloqueia o envio e mostra os erros para o usuário.
*/

import { useNavigate } from "react-router-dom";
import estilos from "./LoginUsuario.module.css";
import login from "../../assets/imagens/logo.png";

import { ModalMensagem } from "../../componentes/SUPORTE/modal/ModalMensagem";
import { FaCircleUser } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAutenticacao } from "../../hooks/useAutenticacao";
import { autenticacao } from "../../firebase/FirebaseConexao";
import { AutenticacaoContexto } from "../../contextos/AutenticacaoContexto";

import { GoogleLogin } from "@react-oauth/google";

type FormValues = {
  tipo: "usuario" | "instituicao";
  email: string;
  senha: string;
};

const loginSchema = z.object({
  tipo: z.enum(["usuario", "instituicao"], {
    message: "Selecione o tipo de login.",
  }),

  email: z.email({
    message: "Informe um e-mail válido.",
  }),

  senha: z.string().min(8, {
    message: "Informe uma senha com no mínimo 8 caracteres.",
  }),
});

export function LoginUsuario() {
  const { validarUsuario, loginComGoogle } = useAutenticacao();

  const { usuarioContexto, atualizarUsuarioContexto } = useContext(AutenticacaoContexto);

  const navegacao = useNavigate();

  const [loginSucesso, setLoginSucesso] = useState(false);
  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false);
  const [modalMensagemTexto, setMensagemTexto] = useState("");

  const exibirModal = () => {
    setModalMensagemVisivel(true);
  };

  const ocultarModal = () => {
    setModalMensagemVisivel(false);

    if (loginSucesso) {
      navegacao("/home");
    }
  };

  const {register,handleSubmit,formState: { errors },} = useForm<FormValues>({resolver: zodResolver(loginSchema),});

  // Login com e-mail e senha
  const autenticarUsuario = async (data: FormValues) => {
    const retorno = await validarUsuario(data.email, data.senha, data.tipo);

    if (retorno === "sucesso") {
      setLoginSucesso(true);

      if (autenticacao.currentUser) {
        await atualizarUsuarioContexto(autenticacao.currentUser.uid);
      }

      setMensagemTexto(
        `Login realizado com sucesso! Bem-vindo(a), ${usuarioContexto?.nome ?? autenticacao.currentUser?.email}!`,
      );
    } else {
      setLoginSucesso(false);
      setMensagemTexto(`Erro: ${retorno}`);
    }

    exibirModal();
  };

  const cadastro = () => {
    navegacao("/cadastro");
  };

  return (
    <div className={estilos.alinhamento}>
      <div className={estilos.conteiner1}>
        <form
          className={estilos.formulario}
          onSubmit={handleSubmit(autenticarUsuario)}
        >
          <h1 className={estilos.titulo}>Login</h1>

          <div className={estilos.tipologin}>
            <input
              {...register("tipo")}
              className={estilos.radio}
              type="radio"
              id="usuario"
              value="usuario"
            />

            <label htmlFor="usuario" className={estilos.radioLabel}>
              <FaCircleUser />
              Usuário
            </label>

            <input
              {...register("tipo")}
              id="instituicao"
              value="instituicao"
              type="radio"
              className={estilos.radio}
            />

            <label htmlFor="instituicao" className={estilos.radioLabel}>
              <LuSchool />
              Instituição
            </label>
          </div>

          {errors.tipo && (
            <p className={estilos.mensagem}>{errors.tipo.message}</p>
          )}

          <div className={estilos.inputgroup}>
            <input {...register("email")} className={estilos.campo} />

            <label>Email</label>

            {errors.email && (
              <p className={estilos.mensagem}>{errors.email.message}</p>
            )}
          </div>

          <div className={estilos.inputgroup}>
            <input
              {...register("senha")}
              className={estilos.campo}
              type="password"
            />

            <label>Senha</label>

            {errors.senha && (
              <p className={estilos.mensagem}>{errors.senha.message}</p>
            )}
          </div>

          <div className={estilos.senha}>
            <p>Esqueceu a senha?</p>
          </div>

          <button type="submit" className={estilos.botao}>
            Entrar
          </button>

          <div className={estilos.cadastro}>
            <p>Não possui login?</p>

            <button
              type="button"
              className={estilos.novoUsuario}
              onClick={cadastro}
            >
              Cadastre-se!
            </button>
          </div>

          <div className={estilos.google}>
            <p>Ou faça login com:</p>

            <GoogleLogin
              theme="filled_blue"
              auto_select={true}
              onSuccess={async (credentialResponse) => {
                if (!credentialResponse.credential) {
                  setLoginSucesso(false);
                  setMensagemTexto(
                    "Não foi possível obter a credencial do Google.",
                  );
                  exibirModal();
                  return;
                }

                // Google é exclusivo para usuário comum
                const retorno = await loginComGoogle(
                  credentialResponse.credential,
                );

                if (retorno === "sucesso") {
                  const usuario = autenticacao.currentUser;

                  setLoginSucesso(true);

                  if (usuario) {
                    await atualizarUsuarioContexto(usuario.uid);
                  }

                  setMensagemTexto(
                    `Login realizado com sucesso! Bem-vindo, ${
                      usuario?.displayName ?? usuario?.email
                    }!`,
                  );
                } else {
                  setLoginSucesso(false);
                  setMensagemTexto(retorno);
                }

                exibirModal();
              }}
              onError={() => {
                setLoginSucesso(false);
                setMensagemTexto("Falha ao realizar login com Google.");
                exibirModal();
              }}
            />
          </div>
        </form>
      </div>

      <ModalMensagem
        exibir={modalMensagemVisivel}
        ocultar={ocultarModal}
        titulo="Autenticação"
        texto={modalMensagemTexto}
        foto={autenticacao.currentUser?.photoURL ?? undefined}
      />

      <div className={estilos.conteiner2}>
        <img src={login} alt="Aguato" />
      </div>
    </div>
  );
}
