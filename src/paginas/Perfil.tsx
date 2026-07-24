import type { NovoUsuarioTipo } from "../tipos/NovoUsuario";
import estilos from "./Perfil.module.css";

import semfoto from "../assets/imagens/perfil.png";

import { useEffect, useState, useContext, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { UsuarioContexto } from "../contextos/UsuarioContexto";

export function Perfil() {
  // Obtém os dados do usuário que realizou login pelo Google
  const { usuarioGoogle, setUsuarioGoogle } = useContext(UsuarioContexto);
  // Controla se o modal de edição está aberto
  const [editar, setEditar] = useState(false);
  // Armazena os dados do usuário cadastrado normalmente
  const [usuario, setUsuario] = useState<NovoUsuarioTipo | null>(null);
  // Armazena os dados temporários do formulário de edição
  const [form, setForm] = useState<NovoUsuarioTipo | null>(null);
  // Armazena a biografia do usuário
  const [bio, setBio] = useState({
    bio: "Água segura é vida!",
  });
  // Armazena a biografia enquanto está sendo editada
  const [bioForm, setBioForm] = useState({
    bio: "",
  });
  // Cria uma referência para o input de seleção de foto
  const inputFoto = useRef<HTMLInputElement>(null);
  // Busca os dados salvos no navegador ao carregar a página
  useEffect(() => {
    // Busca os dados do cadastro normal
    const dados = localStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados) as NovoUsuarioTipo);
    }
    // Busca a biografia salva
    const bioSalva = localStorage.getItem("bio");
    if (bioSalva) {
      setBio(JSON.parse(bioSalva));
    }
  }, []);
  // Quando os dados do cadastro são carregados,
  // copia os dados para o formulário de edição
  useEffect(() => {
    if (usuario) {
      setForm({ ...usuario });
    }
  }, [usuario]);
  /*
   * Define os dados que serão apresentados no perfil.
   *
   * Se existir um cadastro normal, ele terá prioridade.
   * Caso contrário, serão utilizados os dados do login Google.
   */
  const usuarioAtual = {
    nome:
      usuario?.nome ||
      usuarioGoogle?.name ||
      "Usuário",
    email:
      usuario?.email ||
      usuarioGoogle?.email ||
      "",
    foto:
      usuarioGoogle?.picture || 
      semfoto
  }
  // Abre o modal de edição
  function abrirModal() {
    // Se existir usuário cadastrado normalmente,
    // copia os dados para o formulário
    if (usuario) {
      setForm({ ...usuario });
    }
    // Copia a biografia atual para edição
    setBioForm({ ...bio });
    // Abre o modal
    setEditar(true);
  }
  // Salva os dados editados
  function salvar() {
    // Verifica se existe um usuário cadastrado normalmente
    if (form) {
      // Atualiza os dados do usuário
      setUsuario(form);
      // Salva os dados atualizados no localStorage
      localStorage.setItem(
        "usuario",
        JSON.stringify(form)
      );
    }
    // Atualiza a biografia
    setBio(bioForm);
    // Salva a biografia no localStorage
    localStorage.setItem(
      "bio",
      JSON.stringify(bioForm)
    );
    // Fecha o modal
    setEditar(false);
  }
  // Cancela as alterações realizadas
  function cancelar() {
    // Restaura os dados originais do cadastro
    if (usuario) {
      setForm({ ...usuario });
    }
    // Restaura a biografia original
    setBioForm({ ...bio });
    // Fecha o modal
    setEditar(false);
  }
  // Abre o seletor de arquivos
  function selecionarFoto() {
    inputFoto.current?.click();
  }
  // Troca a foto do usuário
  function trocarFoto(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    // Obtém o primeiro arquivo selecionado
    const arquivo = e.target.files?.[0];
    // Encerra a função caso nenhum arquivo tenha sido selecionado
    if (!arquivo) return;
    // Cria uma URL temporária para exibir a imagem
    const url = URL.createObjectURL(arquivo)
    // Caso exista um usuário cadastrado normalmente,
    // atualiza a foto dele
    if (usuario) {
      const usuarioAtualizado = {...usuario, picture: url
      }
      // Atualiza o estado do usuário
      setUsuario(usuarioAtualizado);
      // Salva os dados atualizados no localStorage
      localStorage.setItem("usuario",JSON.stringify(usuarioAtualizado)
      )
    }
    // Caso não exista cadastro normal,
    // verifica se existe login pelo Google
    else if (usuarioGoogle) {
      // Atualiza somente a foto do usuário Google
      setUsuarioGoogle({...usuarioGoogle,picture: url
      })
    }
  }
  return (
    <div className={estilos.conteiner}>
      <div className={estilos.perfilCard}>
        <div className={estilos.topo}>
          <div className={estilos.banner}></div>
          <div className={estilos.avatar}>
            <img
              src={usuarioAtual.foto}
              alt="Foto do usuário"
            />
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
          <h1>
            {usuarioAtual.nome}
          </h1>
          <span className={estilos.username}>
            {usuarioAtual.email}
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
              <span>
                Amigos
              </span>
            </div>
            <div className={estilos.stat}>
              <h2>120</h2>
              <span>
                Análises
              </span>
            </div>
            <div className={estilos.stat}>
              <h2>97%</h2>
              <span>
                Água Potável
              </span>
            </div>
            <div className={estilos.stat}>
              <h2>18</h2>
              <span>
                Dias Consecutivos
              </span>
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
          <h2>
            Conquistas
          </h2>
          <div className={estilos.badges}>
            <span>
              Primeira Detecção
            </span>
            <span>
              100 Análises
            </span>
            <span>
              Guardião
            </span>
            <span>
              Mestre Ambiental
            </span>
          </div>
        </div>
        <div className={estilos.card}>
          <h2>
            Atividade Recente
          </h2>
          <ul className={estilos.lista}>
            <li>
              Detectou água do Rio Azul
            </li>
            <li>
              Registrou 500 ml de água
            </li>
            <li>
              Nova conquista desbloqueada
            </li>
            <li>
              Sequência de 18 dias
            </li>
          </ul>
        </div>
      </div>
      {editar && (
        <div className={estilos.overlay}>
          <div className={estilos.modal}>
            <h2>
              Editar Perfil
            </h2>
            {form ? (
              <>
                <input
                  value={form.nome}
                  onChange={(e) =>
                    setForm({...form, nome: e.target.value,})
                  }
                  placeholder="Nome"
                />
                <input
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value,})
                  }
                  placeholder="Username"
                />
              </>
            ) : (
              <>
                <input
                  value={usuarioGoogle?.name || ""}
                  onChange={(e) => {
                    if (usuarioGoogle) {setUsuarioGoogle({...usuarioGoogle, name: e.target.value,});}
                  }}
                  placeholder="Nome"
                />
                <input
                  value={usuarioGoogle?.email || ""}
                  readOnly
                  placeholder="Email"
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
  )
}