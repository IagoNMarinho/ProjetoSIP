import type { NovoUsuarioTipo } from "../tipos/NovoUsuario";
import estilos from "./Perfil.module.css";
import semfoto from "../assets/imagens/perfil.png";

import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { autenticacao, bancoDados } from "../firebase/FirebaseConexao";
import { doc, getDoc } from "firebase/firestore";

export function Perfil() {
  const [editar, setEditar] = useState(false);

  const [usuario, setUsuario] = useState<NovoUsuarioTipo | null>(null);

  const [form, setForm] = useState<NovoUsuarioTipo | null>(null);

  const [bio, setBio] = useState("Água segura é vida!");
  const [bioForm, setBioForm] = useState("");

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const inputFoto = useRef<HTMLInputElement>(null);

  const usuarioLogado = autenticacao.currentUser;

  useEffect(() => {
    async function carregarUsuario() {
      if (!usuarioLogado) return;

      const documento = await getDoc(
        doc(bancoDados, "usuarios", usuarioLogado.uid),
      );

      if (documento.exists()) {
        const dados = documento.data();

        setUsuario(dados as NovoUsuarioTipo);
        setForm(dados as NovoUsuarioTipo);
      }
    }

    carregarUsuario();
  }, [usuarioLogado]);

  const usuarioAtual = {
    nome: usuarioLogado?.displayName || usuario?.nome || "Usuário",
    email: usuarioLogado?.email || "",
    foto: fotoPreview || usuarioLogado?.photoURL || semfoto,
  };

  function abrirModal() {
    if (usuario) {
      setForm({ ...usuario });
    }

    setBioForm(bio);
    setEditar(true);
  }

  function salvar() {
    if (form) {
      setUsuario(form);
    }

    setBio(bioForm);
    setEditar(false);
  }

  function cancelar() {
    if (usuario) {
      setForm({ ...usuario });
    }

    setBioForm(bio);
    setEditar(false);
  }

  function selecionarFoto() {
    inputFoto.current?.click();
  }

  function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];

    if (!arquivo) return;

    const url = URL.createObjectURL(arquivo);

    setFotoPreview(url);
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

            {form && (
              <>
                <input
                  value={form.nome}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nome: e.target.value,
                    })
                  }
                  placeholder="Nome"
                />

                <input
                  value={form.username}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      username: e.target.value,
                    })
                  }
                  placeholder="Username"
                />
              </>
            )}

            <textarea
              value={bioForm}
              onChange={(e) => setBioForm(e.target.value)}
              placeholder="Bio"
            />

            <div className={estilos.salvarbutton}>
              <button onClick={salvar}>Salvar</button>

              <button onClick={cancelar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
