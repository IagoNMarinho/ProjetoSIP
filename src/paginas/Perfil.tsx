import estilos from "./Perfil.module.css";
import semfoto from "../assets/imagens/perfil.png";

import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AutenticacaoContexto } from "../contextos/AutenticacaoContexto";
import { autenticacao, bancoDados } from "../firebase/FirebaseConexao";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { enviarParaCloudinary } from "../componentes/APICloudinary/Cloudinary";
import { Toast } from "../componentes/SUPORTE/Toast/Toast";

const perfilSocialSchema = z.object({
  nome: z.string().min(3, {
    message: "O nome deve ter no mínimo 3 caracteres.",
  }),
  username: z.string().min(3, {
    message: "O username deve ter no mínimo 3 caracteres.",
  }),
  bio: z.string().max(150, {
    message: "A bio pode ter no máximo 150 caracteres.",
  }),
});

type FormValues = z.infer<typeof perfilSocialSchema>;

export function Perfil() {
  const usuarioLogado = autenticacao.currentUser;
  const { usuarioContexto, atualizarUsuarioContexto } = useContext(AutenticacaoContexto);

  const [editar, setEditar] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(perfilSocialSchema) });

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const usuarioAtual = {
    nome: usuarioContexto?.nome || usuarioLogado?.displayName || "Usuário",
    email: usuarioContexto?.email || usuarioLogado?.email || "",
    foto: fotoPreview || usuarioContexto?.picture || semfoto,
  };

  const bio = (usuarioContexto?.bio as string | undefined) ?? "Fale um pouco sobre você!";

  function abrirModal() {
    reset({
      nome: usuarioContexto?.nome ?? "",
      username: (usuarioContexto?.username as string | undefined) ?? "",
      bio: bio,
    });
    setEditar(true);
  }

  const salvar = async (data: FormValues) => {
    if (!usuarioLogado) return;

    try {
      await updateDoc(doc(bancoDados, "usuarios", usuarioLogado.uid), {
        nome: data.nome,
        username: data.username,
        bio: data.bio,
      });

      await atualizarUsuarioContexto(usuarioLogado.uid);

      setEditar(false);
      mostrarToast("sucesso", "Sucesso", "Perfil atualizado com sucesso!");
    } catch (erro) {
      console.error(erro);
      mostrarToast("erro", "Erro", "Não foi possível salvar as alterações. Tente novamente.");
    }
  };

  function cancelar() {
    setEditar(false);
  }

  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const inputFoto = useRef<HTMLInputElement>(null);

  // Evita que a foto de uma conta "vaze" para outra na mesma aba.
  useEffect(() => {
    setFotoPreview((anterior) => {
      if (anterior) URL.revokeObjectURL(anterior);
      return null;
    });
  }, [usuarioContexto?.uid]);

  function selecionarFoto() {
    inputFoto.current?.click();
  }

  async function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo || !usuarioLogado) return;

    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
    if (!tiposPermitidos.includes(arquivo.type)) {
      mostrarToast("erro", "Formato inválido", "Envie uma imagem JPEG, PNG ou WEBP.");
      return;
    }

    const tamanhoMaximo = 5 * 1024 * 1024;
    if (arquivo.size > tamanhoMaximo) {
      mostrarToast("erro", "Arquivo muito grande", "A imagem deve ter no máximo 5MB.");
      return;
    }

    const url = URL.createObjectURL(arquivo);
    setFotoPreview(url);

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
      setFotoPreview(null);
    } finally {
      setEnviandoFoto(false);
    }
  }

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
    <div className={estilos.conteiner}>
      <div className={estilos.perfilCard}>
        <div className={estilos.topo}>
          <div className={estilos.banner}></div>

          <div className={estilos.avatar}>
            <img src={usuarioAtual.foto} alt="Foto do usuário" />

            <button
              type="button"
              className={estilos.botaoFoto}
              onClick={selecionarFoto}
              disabled={enviandoFoto}
            >
              <FaEdit />
            </button>

            <input
              ref={inputFoto}
              type="file"
              accept="image/*"
              onChange={trocarFoto}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className={estilos.infoPerfil}>
          <h1>{usuarioAtual.nome}</h1>

          <span className={estilos.username}>{usuarioAtual.email}</span>

          <span className={estilos.level}>Bebedouro de Água</span>

          <p className={estilos.bio}>{bio}</p>

          <div className={estilos.stats}>
            <div className={estilos.stat}>
              <h2>12</h2>
              <span>Amigos</span>
            </div>

            <div className={estilos.stat}>
              <h2>120</h2>
              <span>Análises</span>
            </div>

            <div className={estilos.stat}>
              <h2>97%</h2>
              <span>Água Potável</span>
            </div>

            <div className={estilos.stat}>
              <h2>18</h2>
              <span>Dias Consecutivos</span>
            </div>
          </div>

          <button className={estilos.editButton} onClick={abrirModal}>
            <FaEdit />
            Editar Perfil
          </button>
        </div>
      </div>

      <div className={estilos.gridInferior}>
        <div className={estilos.card}>
          <h2>Conquistas</h2>

          <div className={estilos.badges}>
            <span>Primeira Detecção</span>
            <span>100 Análises</span>
            <span>Guardião</span>
            <span>Mestre Ambiental</span>
          </div>
        </div>

        <div className={estilos.card}>
          <h2>Atividade Recente</h2>

          <ul className={estilos.lista}>
            <li>Detectou água do Rio Azul</li>
            <li>Registrou 500 ml de água</li>
            <li>Nova conquista desbloqueada</li>
            <li>Sequência de 18 dias</li>
          </ul>
        </div>
      </div>

      {editar && (
        <div className={estilos.overlay}>
          <div className={estilos.modal}>
            <h2>Editar Perfil</h2>

            <form onSubmit={handleSubmit(salvar)}>
              <input {...register("nome")} placeholder="Nome" />
              {errors.nome && (
                <p className={estilos.mensagem}>{errors.nome.message}</p>
              )}

              <input {...register("username")} placeholder="Username" />
              {errors.username && (
                <p className={estilos.mensagem}>{errors.username.message}</p>
              )}

              <textarea {...register("bio")} placeholder="Bio" />
              {errors.bio && (
                <p className={estilos.mensagem}>{errors.bio.message}</p>
              )}

              <div className={estilos.salvarbutton}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={cancelar}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast
        exibir={toast.exibir}
        tipo={toast.tipo}
        titulo={toast.titulo}
        texto={toast.texto}
        aoFechar={fecharToast}
      />
    </div>
  );
}