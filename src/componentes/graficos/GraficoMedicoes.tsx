import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import estilos from "./GraficoMedicoes.module.css";
import type { PontoMedicao } from "../../hooks/useDadosDashboard";

type Props = {
  dados: PontoMedicao[];
};

export function GraficoMedicoes({ dados }: Props) {
  const total = dados.reduce((soma, p) => soma + p.quantidade, 0);

  if (total === 0) {
    return <p className={estilos.vazio}>Nenhuma medição para classificar.</p>;
  }

  return (
    <div className={estilos.area}>
      <div className={estilos.rosca}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dados.filter((p) => p.quantidade > 0)}
              dataKey="quantidade"
              nameKey="nome"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {dados
                .filter((p) => p.quantidade > 0)
                .map((p) => (
                  <Cell key={p.classe} fill={p.cor} />
                ))}
            </Pie>
            <Tooltip
              formatter={(valor, nome) => [
                `${valor} ${valor === 1 ? "medição" : "medições"}`,
                nome,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className={estilos.centro}>
          <strong>{total}</strong>
          <span>{total === 1 ? "medição" : "medições"}</span>
        </div>
      </div>

      <ul className={estilos.legenda}>
        {dados.map((p) => (
          <li key={p.classe}>
            <span className={estilos.marca} style={{ background: p.cor }} />
            <span className={estilos.nome}>{p.nome}</span>
            <span className={estilos.valor}>
              {p.quantidade}
              <small> ({Math.round((p.quantidade / total) * 100)}%)</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}