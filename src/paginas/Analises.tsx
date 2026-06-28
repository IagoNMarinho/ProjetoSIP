import estilos from './Analises.module.css'
import { Secao1 } from '../componentes/analises/Secao1'
import { Secao2 } from '../componentes/analises/Secao2'
import { Secao3 } from '../componentes/analises/Secao3'
import { Secao4 } from '../componentes/analises/Secao4'
import { Secao5 } from '../componentes/analises/Secao5'

export function Analises() {
    return (
     <div className={estilos.conteiner}>
            <Secao1 />
            <Secao2 />
            <Secao3 />
            <Secao4 />
            <Secao5 />
    </div>
      
    )
}