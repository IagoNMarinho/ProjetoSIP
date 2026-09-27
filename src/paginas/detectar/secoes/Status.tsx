import estilos from "./Status.module.css";
import { useDispositivoContexto } from "../../../contextos/DispositivoContexto";

export default function Status() {
  const {
    leituras,
    estado,
    corStatus,
    intervaloMonitoramentoS,
    progressoMonitoramento,
    aguardandoImediata,
    enviandoComando,
    conectar,
    desconectar,
    iniciarImediata,
  } = useDispositivoContexto();

  return (
    <section className={estilos.conteiner}>
      <div className={estilos.painel1}>
        <h2 className={estilos.titulo}>Controles</h2>

        <button
          type="button"
          onClick={conectar}
          disabled={
            enviandoComando || estado === "medindo" || estado === "carregando"
          }
        >
          Monitorar
        </button>

        <button
          type="button"
          onClick={desconectar}
          disabled={enviandoComando || estado !== "medindo"}
        >
          Parar
        </button>

        <button
          type="button"
          onClick={iniciarImediata}
          disabled={
            enviandoComando ||
            aguardandoImediata ||
            estado === "offline" ||
            estado === "carregando"
          }
        >
          Imediata
        </button>
      </div>

      <div className={estilos.painel2}>
        <div
          className={estilos.anelProgresso}
          style={
            progressoMonitoramento !== null
              ? ({ "--progresso": `${progressoMonitoramento}%`,} as React.CSSProperties)
              : ({ "--progresso": "0%" } as React.CSSProperties)
          }
        >
          <div
            className={estilos.detectar}
            data-lendo={aguardandoImediata}
            data-status={corStatus}
            data-estado={estado}
          >
            {aguardandoImediata ? (
              "Lendo..."
            ) : estado === "medindo" && progressoMonitoramento !== null ? (
              <span className={estilos.porcentagem}>
                {Math.round(progressoMonitoramento)}%
              </span>
            ) : (
              <>
                {estado === "offline" && "Dispositivo offline"}
                {estado === "pausado" && "Pausado"}
                {estado === "carregando" && "Verificando..."}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={estilos.painel3}>
        <h2 className={estilos.titulo}>Status</h2>

        <div className={estilos.parametros} aria-live="polite">
          <div className={estilos.box}>
            <span className={estilos.parametro}>PH</span>
            <span className={estilos.resultado}>{leituras.ph ?? "--"}</span>
          </div>
          <div className={estilos.box}>
            <span className={estilos.parametro}>Turb.</span>
            <span className={estilos.resultado}>
              {leituras.turbidez ?? "--"}
              <small>NTU</small>
            </span>
          </div>
          <div className={estilos.box}>
            <span className={estilos.parametro}>TDS</span>
            <span className={estilos.resultado}>
              {leituras.tds ?? "--"}
              <small>ppm</small>
            </span>
          </div>
          <div className={estilos.box}>
            <span className={estilos.parametro}>Temp.</span>
            <span className={estilos.resultado}>
              {leituras.temp ?? "--"}
              <small>ºC</small>
            </span>
          </div>
        </div>
        <p className={estilos.tempo}>
          monitorando a cada: {intervaloMonitoramentoS}s
        </p>
      </div>
    </section>
  );
}
