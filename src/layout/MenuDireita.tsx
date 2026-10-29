import estilos from "./MenuDireita.module.css";
import {
  CgUserList,
  CgUserAdd,
  CgTime,
  CgComment,
  CgHeart,
  CgChevronDown,
  CgCheckO,
  CgCloseO,
  CgDanger,
  CgInfo,
  CgProfile,
  CgTrash ,
  CgOrganisation,
  CgPen,
  CgMathPlus,
} from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { autenticacao } from "../firebase/FirebaseConexao";
import { useAtividades, type TipoAtividade } from "../hooks/useAtividades";

import { AutenticacaoContexto } from "../contextos/AutenticacaoContexto";

//icone de cada tipo de atividade
const iconePorTipo: Record<TipoAtividade, ReactNode> = {
  conexao: <CgCheckO />,
  desconexao: <CgCloseO />,
  "leitura-imediata": <CgInfo />,
  qualidade: <CgDanger />,
  "monitoramento-iniciado": <CgTime />,
  "monitoramento-pausado": <CgTime />,
  "codigo-acesso": <CgInfo />,
  "intervalo-monitoramento": <CgTime />,
  "reservatorio-uso": <CgOrganisation />,
  "reservatorio-excluido": <CgTrash/>,
  "reservatorio-editado": <CgPen/>,
  "reservatorio-novo": <CgMathPlus/>,
};

const formatadorRelativo = new Intl.RelativeTimeFormat("pt-BR", {
  numeric: "auto",
});

function tempoRelativo(data: Date, agora: number) {
  const segundos = Math.round((data.getTime() - agora) / 1000); //negativo = passado
  const minutos = Math.round(segundos / 60);
  const horas = Math.round(minutos / 60);
  const dias = Math.round(horas / 24);

  let texto: string;
  if (Math.abs(segundos) < 60) texto = "agora mesmo";
  else if (Math.abs(minutos) < 60)
    texto = formatadorRelativo.format(minutos, "minute");
  else if (Math.abs(horas) < 24)
    texto = formatadorRelativo.format(horas, "hour");
  else texto = formatadorRelativo.format(dias, "day");

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function MenuDireita() {
  const usuarioLogado = autenticacao.currentUser;
  const { usuarioContexto} = useContext(AutenticacaoContexto);

  const location = useLocation();

  const usuarioAtual = {
    nome: usuarioContexto?.nome || usuarioLogado?.displayName || "Usuário",
    email: usuarioContexto?.email || usuarioLogado?.email || "",
  };

  const perfilAtivo = location.pathname === "/perfil";

  const amizadeAtiva = location.pathname.startsWith("/amigos");

  const { atividades } = useAtividades();
  const [agora, setAgora] = useState(Date.now());

  //atualiza os "Há x minutos" a cada minuto
  useEffect(() => {
    const intervalo = setInterval(() => setAgora(Date.now()), 60000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <aside className={estilos.conteiner}>
      <Link
        to="/perfil"
        className={`${estilos.botaoPerfil} ${
          perfilAtivo ? estilos.botaoPerfilAtivo : ""
        }`}
      >
        <div className={estilos.usuario}>
          <div className={estilos.avatar}>
            <CgProfile />
          </div>

          <div className={estilos.dadosUsuario}>
            <strong>{usuarioAtual.nome}</strong>

            <span>{usuarioAtual.email}</span>
          </div>
        </div>
      </Link>

      <div className={estilos.divisor} />

      <section className={estilos.secao}>
        <span className={estilos.tituloSecao}>AMIZADES</span>

        <div
          className={`${estilos.amizades} ${
            amizadeAtiva ? estilos.amizadesAtiva : ""
          }`}
        >
          <div className={estilos.itemAmizades}>
            <div className={estilos.icone}>
              <CgUserList />
            </div>

            <div className={estilos.conteudoItem}>
              <span>Amizades</span>

              <small>Gerenciar amizades</small>
            </div>

            <CgChevronDown className={estilos.seta} />
          </div>

          <div className={estilos.submenu}>
            <Link to="/amigos" className={estilos.subItem}>
              <CgUserList />

              <span>Meus amigos</span>
            </Link>

            <Link to="/addamg" className={estilos.subItem}>
              <CgUserAdd />

              <span>Adicionar amigos</span>
            </Link>

            <Link to="/solicitacoes" className={estilos.subItem}>
              <CgTime />

              <span>Solicitações</span>

              <strong className={estilos.contador}>3</strong>
            </Link>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloComContador}>
          <span className={estilos.tituloSecao}>NOTIFICAÇÕES</span>

          <span className={estilos.contadorTitulo}>3</span>
        </div>

        <div className={estilos.painel}>
          <div className={estilos.notificacao}>
            <div className={estilos.iconeNotificacao}>
              <CgUserAdd />
            </div>

            <div>
              <strong>Nova solicitação</strong>

              <span>Você recebeu uma solicitação</span>
            </div>
          </div>

          <div className={estilos.notificacao}>
            <div className={estilos.iconeNotificacao}>
              <CgComment />
            </div>

            <div>
              <strong>Análise compartilhada</strong>

              <span>Você compartilhou 6 análises</span>
            </div>
          </div>

          <div className={estilos.notificacao}>
            <div className={estilos.iconeNotificacao}>
              <CgHeart />
            </div>

            <div>
              <strong>Nova interação</strong>

              <span>Alguém interagiu com você</span>
            </div>
          </div>
        </div>
      </section>

      <section className={estilos.secaoAtividade}>
        <span className={estilos.tituloSecao}>ATIVIDADE</span>
          <div className={estilos.atividades}>
            <div className={estilos.painel}>
              {atividades.length === 0 && (
                <span className={estilos.semAtividade}>
                  Nenhuma atividade recente.
                </span>
              )}

              {atividades.map((atividade) => (
                <div
                  className={estilos.atividade}
                  key={atividade.id}
                  title={atividade.descricao ?? undefined}
                >
                  <div className={estilos.linhaAtividade} />

                  <div className={estilos.iconeAtividade}>
                    {iconePorTipo[atividade.tipo] ?? <CgInfo />}
                  </div>

                  <div className={estilos.conteudoAtividade}>
                    <strong>{atividade.titulo}</strong>
                    {atividade.descricao && <span>{atividade.descricao}</span>}
                    <span>{tempoRelativo(atividade.criadoEm, agora)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
    </aside>
  );
}
