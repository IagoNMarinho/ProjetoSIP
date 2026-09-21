import { useNavigate } from "react-router-dom";
import estilos from "./CadastroUsuario.module.css";
import logo from "../../../assets/imagens/logo.png";

import { FaCircleUser } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";

import { ModalMensagem } from "../../../componentes/SUPORTE/modal/ModalMensagem";

import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAutenticacao } from "../../../hooks/useAutenticacao";

import { AutenticacaoContexto } from "../../../contextos/AutenticacaoContexto";
import { autenticacao } from "../../../firebase/FirebaseConexao";

type FormValues = {
  nomeCompleto: string;
  dataNas: string;
  username: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  confsenha: string;
};

const CadastroSchema = z
  .object({
    nomeCompleto: z.string().min(8, {
      message: "Informe um Nome Completo com no mínimo 8 caracteres.",
    }),
    dataNas: z.string().refine(
      (data) => {
        return new Date(data) <= new Date();
      },
      {
        message: "A data de nascimento não pode ser no futuro.",
      },
    ),
    username: z.string().min(4, {
      message: "Informe um Username com no mínimo 4 caracteres.",
    }),
    cpf: z.string().regex(/^\d{11}$/, {
      message: "O CPF deve conter 11 números.",
    }),
    email: z.email({
      message: "Informe um Email válido.",
    }),
    telefone: z.string().regex(/^\d{11}$/, {
      message: "Telefone deve conter 11 números.",
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

export function CadastroUsuario() {
  const { atualizarUsuarioContexto } = useContext(AutenticacaoContexto);

  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false);
  const [modalMensagemTexto, setMensagemTexto] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const exibirModal = () => setModalMensagemVisivel(true);

  const ocultarModal = async () => {
    setModalMensagemVisivel(false);

    if (cadastroSucesso) {
      await deslogar();
      navegacao("/");
    } else {
      navegacao("/cadastro");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(CadastroSchema) });

  //cria o objeto de autenticacao e novo usuario
  const { cadastrarUsuario, deslogar } = useAutenticacao();

  const adicionarUsuario = async (data: FormValues) => {
    //cria a conta no firebase authenticantion
    const retorno = await cadastrarUsuario(data.email, data.senha, {
      //salva os demais dados no firestore
      nome: data.nomeCompleto,
      dataNas: data.dataNas,
      username: data.username,
      cpf: data.cpf,
      telefone: data.telefone,
      
    });
    if (retorno === "sucesso") {
      setCadastroSucesso(true);
      if (autenticacao.currentUser) {
        await atualizarUsuarioContexto(autenticacao.currentUser.uid);
      }
      setMensagemTexto(`Cadastro realizado com sucesso!`);
    } else {
      setCadastroSucesso(false);
      setMensagemTexto(retorno);
    }

    exibirModal();
  };

  const navegacao = useNavigate();

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
          <button onClick={cadastroUsuario} id={estilos.focus}>
            <FaCircleUser />
            <span>Usuário</span>
          </button>
          <button onClick={cadastroInstituicao}>
            <LuSchool />
            <span>Instituição</span>
          </button>
        </div>

        <form
          className={estilos.formulario}
          onSubmit={handleSubmit(adicionarUsuario)}
        >
          <h1 className={estilos.titulo}>Cadastro Usuário</h1>
          <div className={estilos.inputs}>
            <div className={estilos.inputgroup} id={estilos.inteiro}>
              <input {...register("nomeCompleto")} className={estilos.campo} />

              <label>Nome Completo</label>
              {errors.nomeCompleto && (
                <p className={estilos.mensagem}>
                  {errors.nomeCompleto.message}
                </p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.inteiro}>
              <input
                {...register("dataNas")}
                className={estilos.campo}
                type="date"
              />

              <label>Data nascimento</label>
              {errors.dataNas && (
                <p className={estilos.mensagem}>{errors.dataNas.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.metade}>
              <input {...register("username")} className={estilos.campo} />
              <label>Username</label>
              {errors.username && (
                <p className={estilos.mensagem}>{errors.username.message}</p>
              )}
            </div>

            <div className={estilos.inputgroup} id={estilos.metade}>
              <input {...register("cpf")} className={estilos.campo} />
              <label>CPF</label>
              {errors.cpf && (
                <p className={estilos.mensagem}>{errors.cpf.message}</p>
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
