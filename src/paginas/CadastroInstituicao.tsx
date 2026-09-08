import { useNavigate } from "react-router-dom";
import estilos from "./Cadastroinstituicao.module.css";
import logo from "../assets/imagens/logo.png";

import { FaCircleUser } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";

import { ModalMensagem } from "../componentes/ModalMensagem";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAutenticacao } from "../hooks/useAutenticacao";

import { useContext } from "react";
import { AutenticacaoContexto } from "../contextos/AutenticacaoContexto";
import { autenticacao } from "../firebase/FirebaseConexao";

type FormValues = {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  codigo: string;
  senha: string;
  confsenha: string;
};

const CadastroSchema = z
  .object({
    nome: z.string().min(8, {
      message: "Informe um Nome Completo com no mínimo 8 caracteres.",
    }),
    cnpj: z.string().regex(/^\d{14}$/, {
      message: "CNPJ deve conter 14 números",
    }),
    email: z.email({
      message: "Informe um Email válido.",
    }),
    telefone: z.string().regex(/^\d{11}$/, {
      message: "Telefone deve conter 11 números.",
    }),
    codigo: z.string().regex(/^\d{4}$/, {
      message: "O código deve conter 4 caracteres.",
    }),
    senha: z.string().min(8, {
      message: "Informe uma senha com no mínimo 8 caracteres.",
    }),
    confsenha: z.string().min(8, {
      message: "Informe uma senha com no mínimo 8 caracteres.",
    }),
  })
  .refine((dados) => dados.senha === dados.confsenha, {
    message: "As senhas não coincidem.",
    path: ["confsenha"],
  });

export function CadastroInstituicao() {
  const navegacao = useNavigate();
  const { cadastrarInstituicao, deslogar } = useAutenticacao();

  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false);
  const [modalMensagemTexto, setMensagemTexto] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const { atualizarUsuarioContexto } = useContext(AutenticacaoContexto);

  const exibirModal = () => setModalMensagemVisivel(true);

  const ocultarModal = async () => {
    setModalMensagemVisivel(false);
    if (cadastroSucesso) {
      await deslogar();
      navegacao("/");
    } else {
      navegacao("/cadastroinstituicao");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(CadastroSchema) });

  const autenticarInstituicao = async (data: FormValues) => {
    const retorno = await cadastrarInstituicao(data.email, data.senha, {
      nome: data.nome,
      cnpj: data.cnpj,
      telefone: data.telefone,
      codigo: data.codigo,
    });
    if (retorno === "sucesso") {
      setCadastroSucesso(true);
      if (autenticacao.currentUser) {
        await atualizarUsuarioContexto(autenticacao.currentUser.uid);
      }
      setMensagemTexto(
        `Cadastro realizado com sucesso!`,
      );
    } else {
      setCadastroSucesso(false);
      setMensagemTexto(retorno);
    }
    exibirModal();
  };

  const login = () => {
    navegacao("/");
  };

  const cadastroUsuario = () => {
    navegacao("/cadastro");
  };
  const cadastroInstituicao = () => {
    navegacao("/cadastroinstituicao");
  };

  return (
    <div className={estilos.alinhamento}>
      <div className={estilos.conteiner1}>
        <div className={estilos.tipoLogin}>
          <button onClick={cadastroUsuario}>
            <FaCircleUser />
            <span>Usuário</span>
          </button>
          <button onClick={cadastroInstituicao} id={estilos.focus}>
            <LuSchool />
            <span>Instituição</span>
          </button>
        </div>

        <form
          className={estilos.formulario}
          onSubmit={handleSubmit(autenticarInstituicao)}
        >
          <h1 className={estilos.titulo}>Cadastro Instituição</h1>

          <div className={estilos.inputs}>
            <div className={estilos.inputgroup} id={estilos.inteiro}>
              <input {...register("nome")} className={estilos.campo} />
              <label>Nome Completo</label>

              {errors.nome && (
                <p className={estilos.mensagem}>{errors.nome.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.inteiro}>
              <input {...register("cnpj")} className={estilos.campo} />
              <label>CNPJ</label>

              {errors.cnpj && (
                <p className={estilos.mensagem}>{errors.cnpj.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.metade}>
              <input {...register("email")} className={estilos.campo} />
              <label>E-mail</label>

              {errors.email && (
                <p className={estilos.mensagem}>{errors.email.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.metade}>
              <input {...register("telefone")} className={estilos.campo} />
              <label>Telefone</label>

              {errors.telefone && (
                <p className={estilos.mensagem}>{errors.telefone.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.metade}>
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

            <div className={estilos.inputgroup} id={estilos.metade}>
              <input
                {...register("confsenha")}
                className={estilos.campo}
                type="password"
              />
              <label>Confirmar Senha</label>

              {errors.confsenha && (
                <p className={estilos.mensagem}>{errors.confsenha.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.inteiro}>
              <input {...register("codigo")} className={estilos.campo} />
              <label>Código de Ativação</label>

              {errors.codigo && (
                <p className={estilos.mensagem}>{errors.codigo.message}</p>
              )}
            </div>
          </div>

          <button className={estilos.botao}>Cadastrar</button>

          <div className={estilos.jalogin}>
            <p>Já possui cadastro?</p>
            <button className={estilos.novoUsuario} onClick={login}>
              Realize o login!
            </button>
          </div>
        </form>
      </div>

      <ModalMensagem
        exibir={modalMensagemVisivel}
        ocultar={() => ocultarModal()}
        titulo="Autenticação"
        texto={modalMensagemTexto}
      />

      <div className={estilos.conteiner2}>
        <img src={logo} alt="Aguato" />
      </div>
    </div>
  );
}
