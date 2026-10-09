import estilos from "./ModalAnalises.module.css";
import type { Analise } from "../../../hooks/useAnalises";
import { useState } from "react";

import { FaCircle } from "react-icons/fa6";

interface ModalAnalisesProps {
  exibir: boolean;
  analises: Analise[];
  analiseSelecionada?: Analise | null;
  modo: "todas" | "detalhes";
  selecionarAnalise: (analise: Analise) => void;
  abrirDetalhes: () => void;
  ocultar: () => void;
}

//converte o texto do input de data ("2026-09-27") em um Date de verdade
function parseDataInput(valor: string): Date | null {
  if (!valor) return null;
  const [ano, mes, dia] = valor.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

//confere se a data da analise cai dentro do intervalo escolhido (inicio e/ou fim podem estar vazios)
function passaFiltroData(
  dataAnalise: Date,
  inicio: string,
  fim: string,
): boolean {
  const dataInicio = parseDataInput(inicio);
  const dataFim = parseDataInput(fim);

  if (dataInicio) {
    dataInicio.setHours(0, 0, 0, 0); //conta a partir do comecinho do dia escolhido
    if (dataAnalise < dataInicio) return false;
  }

  if (dataFim) {
    dataFim.setHours(23, 59, 59, 999); //conta ate o finalzinho do dia escolhido
    if (dataAnalise > dataFim) return false;
  }

  return true;
}

export function ModalAnalises({
  exibir,
  analises,
  analiseSelecionada,
  modo,
  selecionarAnalise,
  abrirDetalhes,
  ocultar,
}: ModalAnalisesProps) {
  const [filtroStatus, setFiltroStatus] = useState<"todas" | Analise["status"]>(
    "todas",
  );
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  if (!exibir) {
    return null;
  }

  const analisesFiltradas = analises.filter((analise) => {
    const passaStatus =
      filtroStatus === "todas" || analise.status === filtroStatus;
    const passaData = passaFiltroData(analise.data, dataInicio, dataFim);
    return passaStatus && passaData;
  });

  const nomeStatus = (status: Analise["status"]) => {
    if (status === "Potável") {
      return "Adequada";
    }
    if (status === "Atenção") {
      return "Atenção";
    }
    return "Crítica";
  };

  const classeStatus = (status: Analise["status"]) => {
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

        </div>

        {modo === "todas" && (
          <div className={estilos.lista}>
            <div className={estilos.barraFiltros}>
              <div className={estilos.filtros}>
                <button
                  type="button"
                  className={estilos.filtro}
                  data-ativo={filtroStatus === "todas"}
                  onClick={() => setFiltroStatus("todas")}
                >
                  Todos
                </button>

                <button
                  type="button"
                  className={`${estilos.filtro} ${estilos.filtroAdequada}`}
                  data-ativo={filtroStatus === "Potável"}
                  onClick={() => setFiltroStatus("Potável")}
                >
                  <FaCircle />
                  Adequada
                </button>

                <button
                  type="button"
                  className={`${estilos.filtro} ${estilos.filtroPendente}`}
                  data-ativo={filtroStatus === "Atenção"}
                  onClick={() => setFiltroStatus("Atenção")}
                >
                  <FaCircle />
                  Atenção
                </button>

                <button
                  type="button"
                  className={`${estilos.filtro} ${estilos.filtroCritico}`}
                  data-ativo={filtroStatus === "Crítica"}
                  onClick={() => setFiltroStatus("Crítica")}
                >
                  <FaCircle />
                  Crítica
                </button>
              </div>

              <div className={estilos.filtrosData}>
                <label>
                  De:
                  <input
                    type="date"
                    className={estilos.inputData}
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </label>

                <label>
                  Até:
                  <input
                    type="date"
                    className={estilos.inputData}
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </label>

                {(dataInicio || dataFim) && (
                  <button
                    type="button"
                    className={estilos.limparData}
                    onClick={() => {
                      setDataInicio("");
                      setDataFim("");
                    }}
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {analisesFiltradas.length === 0 ? (
              <p>Nenhuma análise encontrada.</p>
            ) : (
              analisesFiltradas.map((analise) => (
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
                    <h3>{analise.codigo}</h3>
                    <p>Local: {analise.local ?? "não informado"}</p>
                    <p>
                      {analise.data.toLocaleDateString("pt-BR")}
                      {" - "}
                      {analise.data.toLocaleTimeString("pt-BR", {
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
            <h3>{analiseSelecionada.codigo}</h3>
            <div className={estilos.informacoes}>
              <p>
                <strong>Local:</strong>{" "}
                {analiseSelecionada.local ?? "Não informado"}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {analiseSelecionada.data.toLocaleDateString("pt-BR")}
              </p>
              <p>
                <strong>Horário:</strong>{" "}
                {analiseSelecionada.data.toLocaleTimeString("pt-BR", {
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
                  <strong>pH: </strong> {analiseSelecionada.ph ?? "--"}
                </p>
                <p>
                  <strong>Turbidez: </strong>
                  {analiseSelecionada.turbidez ?? "--"} NTU
                </p>
                <p>
                  <strong>TDS: </strong> {analiseSelecionada.tds ?? "--"}
                  ppm
                </p>
                <p>
                  <strong>Temperatura: </strong>
                  {analiseSelecionada.temp ?? "--"} °C
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
