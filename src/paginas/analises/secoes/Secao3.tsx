import estilos from "./Secao3.module.css";
import { FaCircle } from "react-icons/fa6";

import { useState } from "react";
import { useAnalises, type Analise } from "../../../hooks/useAnalises";

import { ModalAnalises } from "../../../componentes/SUPORTE/modal/ModalAnalises";
import { useDadosGrafico, type PeriodoGrafico } from "../../../hooks/useDadosDashboard";
import { GraficoPeriodos } from "../../../componentes/graficos/GraficoPeriodos";

export function Secao3() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<"todas" | "detalhes">("todas"); //determina se mostra todas ou detalhes
  const [analiseSelecionada, setAnaliseSelecionada] = useState<Analise | null>(
    null,
  ); //guarda qual análise o usuário clicou
  const { analises } = useAnalises(); //busca as analises reais do Firestore, ja em tempo real
  const analisesRecentes = analises.slice(0, 5);

  const nomeStatus = (status: Analise["status"]) => {
    if (status === "Potável") {
      return "Adequada";
    }
    if (status === "Atenção") {
      return "Pendente";
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

  const [periodo, setPeriodo] = useState<PeriodoGrafico>("dia"); //período escolhido no select do gráfico
  const dadosGrafico = useDadosGrafico(analises, periodo); //quantidade de análises por intervalo, já agrupada para o gráfico

  return (
    <div className={estilos.conteiner}>
      <div className={estilos.analises}>
        <div className={estilos.titulo}>
          <h2>Histórico de análises</h2>
          <button
            onClick={() => {
              setModoModal("todas");
              setAnaliseSelecionada(null);
              setModalAberto(true);
            }}
          >
            Ver todas
          </button>
        </div>

        {analisesRecentes.map((analise) => (
          <div className={estilos.card} key={analise.id}>
            <div className={estilos.box1}>
              <h2>{analise.codigo}</h2>
              <p>Local: {analise.local ?? "não informado"}</p>
            </div>
            <div className={estilos.box1}>
              <p>{analise.data.toLocaleDateString("pt-BR")}</p>
              <p>
                {analise.data.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className={estilos.box2}>
              <button className={classeStatus(analise.status)}>
                <FaCircle />
                <span>{nomeStatus(analise.status)}</span>
              </button>
              <button
                className={estilos.detalhes}
                onClick={() => {
                  setAnaliseSelecionada(analise);
                  setModoModal("detalhes");
                  setModalAberto(true);
                }}
              >
                <span>Ver detalhes</span>
              </button>
            </div>
          </div>
        ))}
        {analisesRecentes.length === 0 && (
          <div className={estilos.card}>
            <p>Nenhuma análise realizada.</p>
          </div>
        )}
      </div>

      <div className={estilos.grafico}>
        <div className={estilos.titulo}>
          <h2>Gráfico</h2>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value as PeriodoGrafico)}
          >
            <option value="dia">dia</option>
            <option value="semana">semana</option>
            <option value="mês">mês</option>
          </select>
        </div>
        <GraficoPeriodos dados={dadosGrafico}/>
      </div>

      <ModalAnalises
        exibir={modalAberto}
        analises={analises}
        analiseSelecionada={analiseSelecionada}
        modo={modoModal}
        selecionarAnalise={(analise) => {
          setAnaliseSelecionada(analise);
        }}
        abrirDetalhes={() => setModoModal("detalhes")}
        ocultar={() => {
          setModalAberto(false);
          setAnaliseSelecionada(null);
        }}
      />
    </div>
  );
}
