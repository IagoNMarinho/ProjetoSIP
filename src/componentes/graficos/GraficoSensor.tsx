import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import estilos from "./GraficoSensor.module.css";
import type { PontoSensor } from "../../hooks/useDadosDashboard";

type Props = {
  titulo: string;
  unidade: string; 
  cor: string;
  dados: PontoSensor[];
  casas?: number;
};

export function GraficoSensor({ titulo, unidade, cor, dados, casas = 1 }: Props) {
  const formatar = (n: number) =>
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
    });
  const comUnidade = (n: number) => `${formatar(n)}${unidade ? ` ${unidade}` : ""}`;

  if (dados.length === 0) {
    return (
      <article className={estilos.cartao}>
        <h3>{titulo}</h3>
        <p className={estilos.vazio}>Sem leituras deste sensor.</p>
      </article>
    );
  }

  const valores = dados.map((d) => d.valor);
  const ultimo = valores[valores.length - 1];
  const media = valores.reduce((soma, v) => soma + v, 0) / valores.length;
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);

  return (
    <article className={estilos.cartao}>
      <header className={estilos.topo}>
        <h3>{titulo}</h3>
        <div className={estilos.atual}>
          <strong style={{ color: cor }}>{comUnidade(ultimo)}</strong>
          <span>última leitura</span>
        </div>
      </header>

      <div className={estilos.area}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="rotulo"
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={48}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              width={44}
              domain={["auto", "auto"]}
              tickFormatter={formatar}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(valor) => [comUnidade(Number(valor)), titulo]}
              labelFormatter={(rotulo) => `Análise de ${rotulo}`}
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke={cor}
              strokeWidth={2}
              dot={dados.length <= 15}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <footer className={estilos.resumo}>
        <span>Mín. <b>{formatar(minimo)}</b></span>
        <span>Média <b>{formatar(media)}</b></span>
        <span>Máx. <b>{formatar(maximo)}</b></span>
      </footer>
    </article>
  );
}