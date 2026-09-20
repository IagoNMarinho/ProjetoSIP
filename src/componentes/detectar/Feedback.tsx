import { useMemo, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import estilos from "./Feedback.module.css";

const algas_quant = 16;

export default function Feedback() {
  const status = "segura";

  const algas = useMemo(
    () =>
      Array.from({ length: algas_quant }, (_, i) => ({
        id: i,
        estilo: {
          left: `${(i / algas_quant) * 96 + Math.random() * 4}%`,
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
        {algas.map((a) => (
          <span key={a.id} className={estilos.alga} style={a.estilo} />
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
      <div className={estilos.feedback} role="status">
        <h1>Segura!</h1>
      </div>

      <div className={estilos.painel} data-status={status}>
        <dl className={estilos.dados}>
          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Feedback:</dt>
            <dd className={estilos.resultado}>ÁGUA POTÁVEL</dd>
          </div>
          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Local realizado:</dt>
            <dd className={estilos.resultado}>Reservatório 1</dd>
          </div>
          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Horário realizado:</dt>
            <dd className={estilos.resultado}>
              <time dateTime="18:07">18:07</time>
            </dd>
          </div>
          <div className={estilos.box}>
            <dt className={estilos.rotulo}>Data:</dt>
            <dd className={estilos.resultado}>20/09</dd>
          </div>
          <dl className={estilos.sensores}>
            <div className={estilos.sensor}>
              <dt>PH</dt>
              <dd>7.6</dd>
            </div>
            <div className={estilos.sensor}>
              <dt>TDS</dt>
              <dd>
                120<small>ppm</small>
              </dd>
            </div>
            <div className={estilos.sensor}>
              <dt>Turbidez</dt>
              <dd>
                5<small>NTU</small>
              </dd>
            </div>
            <div className={estilos.sensor}>
              <dt>Temp.</dt>
              <dd>
                20<small>ºC</small>
              </dd>
            </div>
          </dl>
        </dl>

        <div className={estilos.botoes}>
          <button type="button" className={estilos.botao}>
            Baixar coleta
          </button>
          <Link to="/analises" className={estilos.botao}>
            Histórico de análises
          </Link>
          <Link to="/metodologia" className={estilos.botao}>
            Metodologia
          </Link>
        </div>
      </div>
    </section>
  );
}
