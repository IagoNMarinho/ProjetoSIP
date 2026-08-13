import estilos from "./ModalAnalises.module.css";
import type { Analysis } from "./SIMULADOR/simulatorService";
import { FaCircle } from "react-icons/fa6";

interface ModalAnalisesProps {
  //interface
  exibir: boolean;
  analises: Analysis[];
  analiseSelecionada?: Analysis | null;
  modo: "todas" | "detalhes";

  selecionarAnalise: (analise: Analysis) => void;

  abrirDetalhes: () => void;

  ocultar: () => void;
}

export function ModalAnalises({
  //recebimento
  exibir,
  analises,
  analiseSelecionada,
  modo,
  selecionarAnalise,
  abrirDetalhes,
  ocultar,
}: ModalAnalisesProps) {
  if (!exibir) {
    return null;
  }

  const nomeStatus = (status: Analysis["status"]) => {
    if (status === "Potável") {
      return "Adequada";
    }

    if (status === "Atenção") {
      return "Pendente";
    }

    return "Crítica";
  };

  const classeStatus = (status: Analysis["status"]) => {
    if (status === "Potável") {
      return estilos.adequada;
    }
    if (status === "Atenção") {
      return estilos.pendente;
    }
    return estilos.critico;
  };

  return (
    <div className={estilos.fundo}>
      <div className={estilos.conteiner}>
        <div className={estilos.cabecalho}>
          <h2>
            {modo === "todas" ? "Todas as análises" : "Detalhes da análise"}
          </h2>

          <button className={estilos.fechar} onClick={ocultar}>
            ×
          </button>
        </div>

        {modo === "todas" && (
          <div className={estilos.lista}>
            {analises.length === 0 ? (
              <p>Nenhuma análise realizada.</p>
            ) : (
              analises.map((analise, index) => (
                <div
                  className={estilos.card}
                  key={analise.id}
                  onClick={() => {
                    //funcao que irá permitir o usuario acessar o detalhadamento da analise a partir do modal ver todas
                    selecionarAnalise(analise);
                    abrirDetalhes();
                  }}
                >
                  <div>
                    <h3>Análise #{analises.length - index}</h3>

                    <p>Local: {analise.location}</p>

                    <p>
                      {new Date(analise.date).toLocaleDateString("pt-BR")}

                      {" - "}

                      {new Date(analise.date).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div
                    className={`${estilos.status} ${classeStatus(analise.status)}`}
                  >
                    <FaCircle />
                    <span>{nomeStatus(analise.status)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {modo === "detalhes" && analiseSelecionada && (
          <div className={estilos.detalhes}>
            <h3>Análise #{analises.indexOf(analiseSelecionada) + 1}</h3>

            <div className={estilos.informacoes}>
              <p>
                <strong>Local:</strong> {analiseSelecionada.location}
              </p>

              <p>
                <strong>Data:</strong>{" "}
                {new Date(analiseSelecionada.date).toLocaleDateString("pt-BR")}
              </p>

              <p>
                <strong>Horário:</strong>{" "}
                {new Date(analiseSelecionada.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p>
                <strong>Status:</strong> {nomeStatus(analiseSelecionada.status)}
              </p>

              <p>
                <strong>Resultado dos sensores:</strong>
              </p>
                    <div className={estilos.sensores}>
                        <p>
                            <strong>pH: </strong> {analiseSelecionada.sensors.ph}
                        </p>
                        <p>
                            <strong>Turbidez: </strong>
                            {analiseSelecionada.sensors.turbidity} NTU
                            </p>
                        <p>
                            <strong>TDS: </strong> {analiseSelecionada.sensors.tds}
                            ppm
                            </p>
                        <p>
                            <strong>Temperatura: </strong>
                            {analiseSelecionada.sensors.temperature} °C
                        </p>
                    </div>
            </div>
          </div>
        )}

        <button className={estilos.botao} onClick={ocultar}>
          Fechar
        </button>
      </div>
    </div>
  );
}
