import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import estilos from "./GraficoPeriodos.module.css";
import type { PontoGrafico } from "../../hooks/useDadosDashboard";

type Props = {
  dados: PontoGrafico[];
};

export function GraficoPeriodos({ dados }: Props) {
  // se nenhum intervalo tem análise, mostra a mensagem em vez de um gráfico vazio
  const temAnalises = dados.some((ponto) => ponto.quantidade > 0);

  if (!temAnalises) {
    return <p className={estilos.vazio}>Nenhuma análise neste período.</p>;
  }

  return (
    <div className={estilos.area}>
        <ResponsiveContainer width="100%" max-height="100%">
        <BarChart data={dados} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="rotulo"
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={16}
          />
          <YAxis tickLine={false} width={32} allowDecimals={false} />
          <Tooltip
            cursor={{ fillOpacity: 0.1 }}
            formatter={(valor) => [
              `${valor} ${valor === 1 ? "análise" : "análises"}`,
              "Realizadas",
            ]}
            labelFormatter={(rotulo) => `Período: ${rotulo}`}
          />
          <Bar dataKey="quantidade" fill="#2196f3" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}