import { useState } from 'react'
import estilos from './Gole.module.css'

export function Gole() {
   
   const [ meta, setMeta] = useState(2000)
   const [ consumo, setConsumo] = useState(0)
    
   const addAgua = (consumindo: number) => {
    setConsumo((consumido) => consumido + consumindo );
   };

   const barra = Math.min((consumo / meta) * 100, 100);
   
    return (
        <div className={estilos.conteiner}>
            <div className={estilos.area}>
            <h1 id={estilos.circle}>TESTEEEE</h1>

                <label>Meta diária (ml):</label>

                <input
                    type='number'
                    value={meta}
                    onChange={(e) => setMeta(Number(e.target.value))}/>

                    <p className={estilos.status}>
                        {consumo} / {meta} ml
                    </p>
                    <div className={estilos.progress}>
          <div
            className={estilos.bar}
            style={{
              width: `${barra}%`,
            }}
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

         </div>
        </div>
    )
}