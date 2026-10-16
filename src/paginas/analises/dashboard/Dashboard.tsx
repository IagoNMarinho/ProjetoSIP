import estilos from "./Dashboard.module.css";

import { useState } from "react";
import { useAnalises } from "../../../hooks/useAnalises";
import { useAnalisesCompartilhadas } from "../../../hooks/useAnalisesCompartilhadas";
import {
  useDadosGrafico,
  useResumoMedicoes,
  useSeriesSensores,
  type PeriodoGrafico,
} from "../../../hooks/useDadosDashboard";
import { GraficoPeriodos } from "../../../componentes/graficos/GraficoPeriodos";
import { GraficoMedicoes } from "../../../componentes/graficos/GraficoMedicoes";
import { GraficoSensor } from "../../../componentes/graficos/GraficoSensor";

type Visao = "usuario" | "instituicao";

export function Dashboard() {
  const { analises: minhasAnalises } = useAnalises(); //analises do proprio login (usuario ou instituicao)
  const {
    ehUsuarioComum,
    vinculos,
    vinculoAtual,
    analises: analisesInstituicao,
    carregandoAnalises,
  } = useAnalisesCompartilhadas(); //analises da instituicao, via codigo de acesso

  const [visao, setVisao] = useState<Visao>("usuario");
  const [periodo, setPeriodo] = useState<PeriodoGrafico>("dia");

  //so usuario comum com codigo ativado pode alternar; instituicao ve apenas as proprias
  const podeVerInstituicao = ehUsuarioComum === true && vinculos.length > 0;
  const visaoAtual: Visao = podeVerInstituicao ? visao : "usuario";
  const analises =
    visaoAtual === "instituicao" ? analisesInstituicao : minhasAnalises;

  const resumoMedicoes = useResumoMedicoes(analises);
  const dadosGrafico = useDadosGrafico(analises, periodo);
  const series = useSeriesSensores(analises);

  const carregando = visaoAtual === "instituicao" && carregandoAnalises;

  return (
    <section className={estilos.dashboard}>
      <div className={estilos.titulo2}>
        <h1>Dashboard</h1>
        <small>Aqui você terá acesso a uma ferramenta visual que reúne, organiza e exibe as análises realizadas até o momento.</small>
      </div>
      <div className={estilos.linha}></div>
      {podeVerInstituicao && (
        <div className={estilos.seletor}>
          <div className={estilos.alternador} role="group" aria-label="Origem dos dados">
            <button
              type="button"
              className={visaoAtual === "usuario" ? estilos.ativo : ""}
              aria-pressed={visaoAtual === "usuario"}
              onClick={() => setVisao("usuario")}
            >
              Minhas análises
            </button>
            <button
              type="button"
              className={visaoAtual === "instituicao" ? estilos.ativo : ""}
              aria-pressed={visaoAtual === "instituicao"}
              onClick={() => setVisao("instituicao")}
            >
              Instituição
            </button>
          </div>

          {visaoAtual === "instituicao" && vinculos.length === 1 && vinculoAtual && (
            <span className={estilos.nomeInstituicao}>
              {vinculoAtual.nomeInstituicao}
            </span>
          )}
        </div>
      )}

      {carregando ? (
        <p className={estilos.aviso}>Carregando dados da instituição…</p>
      ) : analises.length === 0 ? (
        <p className={estilos.aviso}>
          Ainda não há análises para mostrar. Quando o dispositivo medir, os
          gráficos aparecem aqui.
        </p>
      ) : (
        <section className={estilos.fundo}>
          <div className={estilos.linhaSuperior}>
            <div className={estilos.cartao}>
              <h2>Medições por classificação</h2>
              <GraficoMedicoes dados={resumoMedicoes} />
            </div>

            <div className={estilos.cartao}>
              <div className={estilos.titulo}>
                <h2>Análises por períodos</h2>
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value as PeriodoGrafico)}
                  aria-label="Período"
                >
                  <option value="dia">dia</option>
                  <option value="semana">semana</option>
                  <option value="mês">mês</option>
                </select>
              </div>
              <div className={estilos.alturaGrafico}>
                <GraficoPeriodos dados={dadosGrafico} />
              </div>
            </div>
          </div>

          <h2 className={estilos.subtitulo}>Variação dos sensores</h2>
          <div className={estilos.gradeSensores}>
            <GraficoSensor titulo="pH" unidade="" cor="#7c4dff" dados={series.ph} casas={2} />
            <GraficoSensor titulo="Turbidez" unidade="NTU" cor="#0a9c3f" dados={series.turbidez} casas={1} />
            <GraficoSensor titulo="Temperatura" unidade="°C" cor="#f70000" dados={series.temp} casas={1} />
            <GraficoSensor titulo="TDS" unidade="ppm" cor="#ea20d6" dados={series.tds} casas={0} />
          </div>
        </section>
      )}
    </section>
  );
}