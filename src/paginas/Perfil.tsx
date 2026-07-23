import type { NovoUsuarioTipo } from "../tipos/NovoUsuario";
import estilos from "./Perfil.module.css";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export function Perfil() {
  const [editar, setEditar] = useState(false);

  const [usuario, setUsuario] = useState<NovoUsuarioTipo | null>(null);

  useEffect(() => {
    const dados = localStorage.getItem("usuario");

    if (dados) {
      setUsuario(JSON.parse(dados) as NovoUsuarioTipo);
    }

    const bioSalva = localStorage.getItem("bio");
    if (bioSalva) {
      setBio(JSON.parse(bioSalva));
    }
  }, []);

  const [bio, setBio] = useState({
    bio: "Água segura é vida!",
  });

  const [bioForm, setBioForm] = useState({
    bio: "",
  });

  const [form, setForm] = useState<NovoUsuarioTipo | null>(null);

  useEffect(() => {
    if (usuario) {
      setForm(usuario);
    }
  }, [usuario]);

  function abrirModal() {
    if (usuario) {
      setForm({ ...usuario });
    }

    setBioForm({ ...bio });
    setEditar(true);
  }

  function salvar() {
    if (form) {
      setUsuario(form);
      localStorage.setItem("usuario", JSON.stringify(form));
    }

    setBio(bioForm);
    localStorage.setItem("bio", JSON.stringify(bioForm));

    setEditar(false);
  }

  function cancelar() {
    if (usuario) {
      setForm({ ...usuario });
    }

    setBioForm({ ...bio });
    setEditar(false);
  }

  return (
    <div className={estilos.conteiner}>
      <div className={estilos.perfilCard}>
        <div className={estilos.topo}>
          <div className={estilos.banner}></div>

          <div className={estilos.avatar}></div>
        </div>

        <div className={estilos.infoPerfil}>
          <h1>{usuario?.nome}</h1>

          <span className={estilos.username}>
            @{usuario?.username}
          </span>

          <span className={estilos.level}>
            Bebedouro de Água
          </span>

          <p className={estilos.bio}>
            {bio.bio}
          </p>

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

          <button
            className={estilos.editButton}
            onClick={abrirModal}
          >
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
              value={bioForm.bio}
              onChange={(e) =>
                setBioForm({
                  bio: e.target.value,
                })
              }
              placeholder="Bio"
            />

            <div className={estilos.salvarbutton}>
              <button onClick={salvar}>
                Salvar
              </button>

              <button onClick={cancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}