import estilos from "./Status.module.css";

export default function Status() {

  return (
    <section className={estilos.conteiner}>

      <div className={estilos.painel1}>
        <button type="button">Monitorar</button>
        <button type="button">Parar</button>
        <button type="button">Unitário</button>
      </div>

      <div className={estilos.painel2}>
        <button type="button" className={estilos.detectar}>
          Detectar
        </button>
      </div>

      <div className={estilos.painel3}>
        <h2 className={estilos.titulo}>Status</h2>

        <div className={estilos.parametros} aria-live="polite">
          <div className={estilos.box}>
            <span className={estilos.parametro}>PH</span>
            <span className={estilos.resultado}>7.5</span>
          </div>
          <div className={estilos.box}>
            <span className={estilos.parametro}>Turb.</span>
            <span className={estilos.resultado}>24.0</span>
          </div>
          <div className={estilos.box}>
            <span className={estilos.parametro}>TDS</span>
            <span className={estilos.resultado}>32.2</span>
          </div>
          <div className={estilos.box}>
            <span className={estilos.parametro}>Temp.</span>
            <span className={estilos.resultado}>12.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
