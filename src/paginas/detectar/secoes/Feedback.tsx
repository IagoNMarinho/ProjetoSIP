import { useMemo, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import estilos from "./Feedback.module.css";

import { FaRegShareSquare } from "react-icons/fa";
import { MdScience, MdDownloadForOffline } from "react-icons/md";
import { IoIosStats } from "react-icons/io";

import { useDispositivoContexto } from "../../../contextos/DispositivoContexto";

const ALGAS_QUANTIDADE = 16;

export default function Feedback() {
  const { leituras, corStatus, estado, aguardandoImediata, reservatorioEmUso } = useDispositivoContexto()

  const temLeituraValida = estado === "medindo" || aguardandoImediata;
  const leiturasVisiveis = temLeituraValida ? leituras : null;
  const statusVisivel = temLeituraValida ? corStatus : "indefinido";

  const textoLocal = !temLeituraValida
    ? "--"
    : reservatorioEmUso
      ? `${reservatorioEmUso.codigo} - ${reservatorioEmUso.local}`
      : "Nenhum selecionado";

  const textoStatus = {
    adequada: "Segura!",
    atencao: "Atenção!",
    critica: "Crítica!",
    indefinido: "Aguardando...",
  }[statusVisivel];

  // Resultado principal da análise
  const resultadoFeedback = {
    adequada: "ÁGUA POTÁVEL",
    atencao: "ATENÇÃO",
    critica: "CRÍTICA",
    indefinido: "SEM LEITURA",
  }[statusVisivel];

  // Cria as algas decorativas do cenário
  const algas = useMemo(
    () =>
      Array.from({ length: ALGAS_QUANTIDADE }, (_, i) => ({
        id: i,
        estilo: {
          left: `${(i / ALGAS_QUANTIDADE) * 96 + Math.random() * 4}%`,
          "--altura": `${70 + Math.random() * 110}px`,
          "--duracao": `${3 + Math.random() * 3}s`,
          "--atraso": `-${Math.random() * 4}s`,
        } as CSSProperties,
      })),
    [],
  );

  return (
    <section className={estilos.conteiner}>
      <div className={estilos.cenario} aria-hidden="true">
        {algas.map((alga) => (
          <span key={alga.id} className={estilos.alga} style={alga.estilo} />
        ))}

        <svg
          className={estilos.areia}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            className={estilos.duna1}
            d="M0,55 C240,15 480,85 720,55 C960,25 1200,75 1440,45 L1440,120 L0,120 Z"
          />

          <path
            className={estilos.duna2}
            d="M0,85 C200,60 420,105 700,85 C980,65 1200,100 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className={estilos.feedback} data-status={statusVisivel} role="status">
        <h1>{textoStatus}</h1>
      </div>

      <div className={estilos.painel}>
        <dl className={estilos.dados}>
          <div className={estilos.box}>
            <dt className={estilos.rotulo} role="status">Feedback:</dt>

            <dd className={estilos.resultadoFinal} data-status={statusVisivel}>{resultadoFeedback}</dd>
          </div>

          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Local realizado:</dt>

            <dd className={estilos.resultado}>{textoLocal}</dd>
          </div>

          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Horário realizado:</dt>

            <dd className={estilos.resultado}>
              <time dateTime={leiturasVisiveis?.hora?.toISOString()}>
                {leiturasVisiveis?.hora?.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) ?? "--"}
              </time>
            </dd>
          </div>

          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Data:</dt>

            <dd className={estilos.resultado}>
              {leiturasVisiveis?.hora?.toLocaleDateString("pt-BR") ?? "--"}
            </dd>
          </div>
        </dl>

        <dl className={estilos.sensores}>
          <div className={estilos.sensor}>
            <dt>pH</dt>

            <dd>{leiturasVisiveis?.ph ?? "--"}</dd>
          </div>

          <div className={estilos.sensor}>
            <dt>TDS</dt>

            <dd>
              {leiturasVisiveis?.tds ?? "--"}
              <small>ppm</small>
            </dd>
          </div>

          <div className={estilos.sensor}>
            <dt>Turbidez</dt>

            <dd>
              {leiturasVisiveis?.turbidez ?? "--"}
              <small>NTU</small>
            </dd>
          </div>

          <div className={estilos.sensor}>
            <dt>Temp.</dt>

            <dd>
              {leiturasVisiveis?.temp ?? "--"}
              <small>°C</small>
            </dd>
          </div>
        </dl>

        <div className={estilos.botoes}>
          <button type="button" className={estilos.botao}>
            <MdDownloadForOffline />
            Baixar
          </button>

          <Link to="/analises" className={estilos.botao}>
            <IoIosStats />
            Análises
          </Link>

          <Link to="/metodologia" className={estilos.botao}>
            <MdScience />
            Metodologia
          </Link>

          <button type="button" className={estilos.botao}>
            <FaRegShareSquare />
            Compartilhar
          </button>
        </div>
      </div>
    </section>
  );
}
