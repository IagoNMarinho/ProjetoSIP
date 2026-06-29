import { useState, useMemo } from "react";
import estilos from "./Gole.module.css";

export function Gole() {
  const [meta, setMeta] = useState(2000);
  const [consumo, setConsumo] = useState(0);

  const addAgua = (quantidade: number) => {
    setConsumo((consumido) => consumido + quantidade);
  };

  const barra = Math.min((consumo / meta) * 100, 100);

  const conquista = useMemo(() => {
    if (consumo >= meta) return " META CONCLUÍDA!";
    if (consumo >= meta * 0.75) return "🥇 75% da meta!";
    if (consumo >= meta * 0.5) return "🥈 50% da meta!";
    if (consumo >= meta * 0.25) return "🥉 25% da meta!";

    return "💧 Você já bebeu água hoje?";
  }, [consumo, meta]);

  const ativarLembrete = async () => {
    const permissao = await Notification.requestPermission();

    if (permissao === "granted") {
      alert("Seu lembrete foi ativado!");

      setInterval(() => {
        new Notification("💧 Hora de beber água!");
      }, 3600000);
    } else {
      alert("Permissão negada.");
    }
  };

  return (
    <div className={estilos.conteiner}>
      <div className={estilos.area}>

        <h1 className={estilos.circle}>GOLE+</h1>

        <label>Meta diária (ml)</label>

        <input
          type="number"
          value={meta}
          onChange={(e) => setMeta(Number(e.target.value))}
        />

        <p className={estilos.status}>
          {consumo} / {meta} ml
        </p>

        <div className={estilos.progress}>
          <div
            className={estilos.bar}
            style={{ width: `${barra}%` }}
          />
        </div>

        <div className={estilos.buttons}>
          <button onClick={() => addAgua(200)}>
            +200 ml
          </button>

          <button onClick={() => addAgua(300)}>
            +300 ml
          </button>

          <button onClick={() => addAgua(500)}>
            +500 ml
          </button>
        </div>

        <div className={estilos.box}>
          <h3>- CONQUISTAS -</h3>

          <p>{conquista}</p>
        </div>

        <div className={estilos.box1}>
          <h3>⏰ LEMBRETE</h3>

          <button onClick={ativarLembrete}>
            Ativar lembrete de 1 hora
          </button>
        </div>

      </div>
    </div>
  );
}