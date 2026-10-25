import estilos from "./MenuSuperior.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { autenticacao } from "../firebase/FirebaseConexao";

import { AutenticacaoContexto } from "../contextos/AutenticacaoContexto";

export function MenuSuperior() {
  const usuarioLogado = autenticacao.currentUser;
  const { usuarioContexto } = useContext(AutenticacaoContexto);

  const [dataAtual, setDataAtual] = useState("");

  const nomeUsuario = usuarioContexto?.nome || usuarioLogado?.displayName || "Usuário";

  useEffect(() => {
    const hoje = new Date();

    const dataFormatada = hoje.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    setDataAtual(dataFormatada);
  }, []);

  return (
    <header className={estilos.conteiner}>
      <div className={estilos.titulo}>
        <h1>Olá, {nomeUsuario}!</h1>

        <h5>{dataAtual}</h5>
      </div>

      <div className={estilos.pesquisa}>
        <FaMagnifyingGlass />

        <input type="text" placeholder="Pesquisar..." />
      </div>
    </header>
  );
}