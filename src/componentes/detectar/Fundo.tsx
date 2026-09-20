import { useMemo, type CSSProperties, type ReactNode } from "react";
import estilos from "./Fundo.module.css";

const bolhas_quant = 45;
const peixes_quant = 30;

export default function Fundo({ children }: { children: ReactNode }) {
  const bolhas = useMemo(
    () =>
      Array.from({ length: bolhas_quant }, (_, i) => {
        const tamanho = 20 + Math.random() * 60;
        return {
          id: i,
          estilo: {
            left: `${Math.random() * 100}%`,
            width: `${tamanho}px`,
            height: `${tamanho}px`,
            animationDuration: `${10 + Math.random() * 10}s`,
            animationDelay: `-${Math.random() * 20}s`,
          } as CSSProperties,
        };
      }),
    [],
  );

  const peixes = useMemo(
    () =>
      Array.from({ length: peixes_quant }, (_, i) => ({
        id: i,
        volta: Math.random() > 0.5,
        estilo: {
          top: `${5 + Math.random() * 85}%`,
          "--escala": 0.5 + Math.random() * 0.9,
          "--duracao": `${20 + Math.random() * 20}s`,
          "--atraso": `-${Math.random() * 30}s`,
          opacity: 0.4 + Math.random() * 0.5,
        } as CSSProperties,
      })),
    [],
  );

  return (
    <div className={estilos.fundo}>
      <div className={estilos.bolhas} aria-hidden="true">
        {bolhas.map((b) => (
          <span key={b.id} className={estilos.bolha} style={b.estilo} />
        ))}
      </div>

      <div className={estilos.peixes} aria-hidden="true">
        {peixes.map((p) => (
          <span
            key={p.id}
            className={`${estilos.peixe} ${p.volta ? estilos.volta : ""}`}
            style={p.estilo}
          />
        ))}
      </div>

      <div className={estilos.conteudo}>{children}</div>
    </div>
  );
}