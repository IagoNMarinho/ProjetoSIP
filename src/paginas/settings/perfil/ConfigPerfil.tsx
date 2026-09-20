import estilos from "./ConfigPerfil.module.css";

import semfoto from "../../../assets/imagens/perfil.png";

import { useState, useContext, useRef, useEffect } from "react";
import { AutenticacaoContexto } from "../../../contextos/AutenticacaoContexto";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../hooks/useAutenticacao";

import { autenticacao, bancoDados, } from "../../../firebase/FirebaseConexao";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { enviarParaCloudinary } from "../../../componentes/APICloudinary/Cloudinary";

import { Confirmar } from "../../../componentes/SUPORTE/Confirmar";
import { Toast } from "../../../componentes/SUPORTE/Toast/Toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { TiUserDelete } from "react-icons/ti";
import { MdSupervisorAccount } from "react-icons/md";

const perfilSchema = z.object({
  nome: z.string().min(8,{
    message: "Informe um nome completo com no mínimo 8 caracteres."
  }),
  email: z.email({
    message:"Infome um email válido."
  }),
  telefone: z.string().regex(/^\d{11}$/,{
    message: "Telefone deve conter 11 números."
  }),
  cpf: z.string().regex(/^\d{11}$/,{
    message: "O CPF deve conter 11 números.",
  }),
  dataNas: z.string(). refine(
    (data) => new Date(data) <= new Date(),
    {message: "A data de nascimento não pode ser no futuro."},
  ),
})
  
type FormValues = z.infer<typeof perfilSchema>

export function ConfigPerfil() {
  const usuarioLogado = autenticacao.currentUser;

  // Os dados do usuário já vêm prontos do AutenticacaoContexto -
  // não precisamos mais buscar no Firestore aqui dentro, o Context
  // já faz isso automaticamente (inclusive depois de um F5).
  const { usuarioContexto, atualizarUsuarioContexto } = useContext(AutenticacaoContexto);

  const [editando, setEditando] = useState(false); //controla se os campos podem ser editados

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormValues>({ resolver: zodResolver(perfilSchema) });

  useEffect(() => {
    if (!usuarioContexto) return;

    reset({
      nome: usuarioContexto.nome ?? "",
      email: usuarioContexto.email ?? "",
      telefone: usuarioContexto.telefone ?? "",
      cpf: usuarioContexto.cpf ?? "",
      dataNas: usuarioContexto.dataNas ?? "",
    });
  }, [usuarioContexto, reset]);

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const inputFoto = useRef<HTMLInputElement>(null);

  // evita que a foto de uma conta "vaze" para outra na mesma aba.
  useEffect(() => {
    setFotoPreview((anterior) => {
      if (anterior) URL.revokeObjectURL(anterior);
      return null;
    });
  }, [usuarioContexto?.uid]);
  
  async function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo || !usuarioLogado) return;

    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
    if (!tiposPermitidos.includes(arquivo.type)) {
      mostrarToast("erro", "Formato inválido", "Envie uma imagem JPEG, PNG ou WEBP.");
      return;
    }

    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
    if (arquivo.size > tamanhoMaximo) {
      mostrarToast("erro", "Arquivo muito grande", "A imagem deve ter no máximo 5MB.");
      return;
    }

    const url = URL.createObjectURL(arquivo);
    setFotoPreview(url); // feedback visual imediato, antes mesmo do upload terminar

    try {
      setEnviandoFoto(true);

      const urlFoto = await enviarParaCloudinary(arquivo);

    await updateProfile(usuarioLogado, { photoURL: urlFoto });
    await updateDoc(doc(bancoDados, "usuarios", usuarioLogado.uid), { picture: urlFoto });
    await atualizarUsuarioContexto(usuarioLogado.uid);

      mostrarToast("sucesso", "Sucesso", "Foto de perfil atualizada!");
    } catch (erro) {
      console.error(erro);
      mostrarToast("erro", "Erro", "Não foi possível atualizar a foto. Tente novamente.");
      setFotoPreview(null); // desfaz o preview, já que o upload falhou
    } finally {
      setEnviandoFoto(false);
    }
  }

  const { deslogar } = useAutenticacao();

  const salvarDados = async (data: FormValues) => {
    if (!usuarioLogado) {
      console.log("Nenhum usuário está logado.");
      return;
    }
    const uid = usuarioLogado.uid;

    try {
      await updateDoc(doc(bancoDados, "usuarios", uid), {
        nome: data.nome,
        telefone: data.telefone,
        cpf: data.cpf,
        dataNas: data.dataNas,
      });

      await atualizarUsuarioContexto(uid);

      setEditando(false);
      mostrarToast("sucesso", "Sucesso", "Dados atualizados com sucesso!");
    } catch (erro) {
      console.error(erro);
      mostrarToast("erro","Erro","Não foi possível salvar os dados. Tente novamente.",);
    }
  }

  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false);
  const [modalMensagemTexto, setMensagemTexto] = useState("");
  const [modalMensagemTitulo, setMensagemTitulo] = useState("");
  const [acaoConfirmar, setAcaoConfirmar] = useState<() => void>(
    () => () => {},
  );

  function abrirConfirmacao(titulo: string, texto: string, acao: () => void) {
    setMensagemTitulo(titulo); //define o título do modal
    setMensagemTexto(texto); //define a mensagem exibida
    setModalMensagemVisivel(true); //abre o modal
    setAcaoConfirmar(() => acao); //guarda a ação que será executada ao confirmar
  }

  function fecharConfirmacao() {
    setModalMensagemVisivel(false);
  }

  const navegacao = useNavigate();
  const sairDaConta = async () => {
    await deslogar();
    navegacao("/");
  };
  const login = () => {
    navegacao("/");
  };

  const [toast, setToast] = useState<{
    exibir: boolean;
    tipo: "sucesso" | "erro";
    titulo: string;
    texto: string;
  }>({
    exibir: false,
    tipo: "sucesso",
    titulo: "",
    texto: "",
  });

  function mostrarToast(
    tipo: "sucesso" | "erro",
    titulo: string,
    texto: string,
  ) {
    setToast({ exibir: true, tipo, titulo, texto });
  }

  function fecharToast() {
    setToast((prev) => ({ ...prev, exibir: false }));
  }

  return (
    <main className={estilos.conteiner}>
      <section className={estilos.intro}>
        <h2 className={estilos.titulo}>Configuração de perfil</h2>
        <p>
          Altere ou visualize as informações de seu perfil na plataforma SIP!
        </p>
      </section>

      <section className={estilos.conta}>
        <div className={estilos.fotoArea}>
          <img
            className={estilos.foto}
            src={fotoPreview || usuarioContexto?.picture || semfoto}
            alt="foto do usuário"
          />

          <button onClick={() => inputFoto.current?.click()} disabled={enviandoFoto}>
            <CiEdit />
          </button>

          <input
            ref={inputFoto} //permite acessar o input pelo botão
            type="file" //aceita seleção de arquivos
            accept="image/*" //permite apenas imagens
            onChange={trocarFoto} //executa a troca da foto após a seleção
            style={{ display: "none" }} //esconde o input do usuário
          />
        </div>

        <form 
          className={estilos.formulario}
          onSubmit={handleSubmit(salvarDados)}
          >
            <div className={estilos.campo}>
              <label>Nome:</label>
              <input
                {...register("nome")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.nome && (
                <p className={estilos.mensagem}>{errors.nome.message}</p>
              )}
            </div>

            <div className={estilos.campo}>
              <label>Email:</label>
              <input
                {...register("email")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.email && (
                <p className={estilos.mensagem}>{errors.email.message}</p>
              )}
            </div>

            <div className={estilos.campo}>
              <label>Telefone:</label>
              <input
                {...register("telefone")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.telefone && (
                <p className={estilos.mensagem}>{errors.telefone.message}</p>
              )}
            </div>

            <div className={estilos.linha}>
              <div className={estilos.campo}>
                <label>CPF:</label>
                <input
                {...register("cpf")}
                  className={estilos.input}
                  readOnly={!editando}
                />
                {errors.cpf && (
                  <p className={estilos.mensagem}>{errors.cpf.message}</p>
                )}
              </div>

              <div className={estilos.campo}>
                <label>Data de nascimento:</label>
                <input
                  {...register("dataNas")}
                  className={estilos.input}
                  type="date"
                  readOnly={!editando}
                />
                {errors.dataNas && (
                  <p className={estilos.mensagem}>{errors.dataNas.message}</p>
                )}
              </div>
            </div>

            <div className={estilos.botoes}>
              <button className={estilos.botao} onClick={() => setEditando(true)} type="button">
                Fazer alterações
              </button>
              <button className={estilos.botao} type="submit">
                Salvar dados
              </button>
            </div>
        </form>
      </section>

      <section className={estilos.sessao}>
        <h2 className={estilos.titulo}>Sessão</h2>
        <div className={estilos.botoes2}>
          <button
            className={estilos.botao}
            onClick={() =>
              abrirConfirmacao(
                "Sair da conta",
                "Tem certeza que deseja sair da sua conta?",
                () => {
                  sairDaConta();
                },
              )
            }
          >
            <CiLogout />
            Sair da conta
          </button>
          <button
            className={estilos.botao}
            onClick={() =>
              abrirConfirmacao(
                "Excluir conta",
                "Esta ação é permanente. Deseja realmente excluir sua conta?",
                () => {
                  login();
                },
              )
            }
          >
            <TiUserDelete />
            Excluir conta
          </button>
          <button
            className={estilos.botao}
            onClick={() =>
              abrirConfirmacao(
                "Trocar conta",
                "Deseja sair da conta atual para entrar com outra?",
                () => {
                  login();
                },
              )
            }
          >
            <MdSupervisorAccount />
            Trocar conta
          </button>
        </div>
      </section>

      <Confirmar
        exibir={modalMensagemVisivel}
        ocultar={fecharConfirmacao}
        titulo={modalMensagemTitulo}
        texto={modalMensagemTexto}
        aoConfirmar={acaoConfirmar}
      />

      <Toast
        exibir={toast.exibir}
        tipo={toast.tipo}
        titulo={toast.titulo}
        texto={toast.texto}
        aoFechar={fecharToast}
      />
    </main>
  );
}
