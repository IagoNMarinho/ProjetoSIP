import estilos from './Analises.module.css'
import { Secao1 } from './secoes/Secao1'
import { Secao2 } from './secoes/Secao2'
import { Secao3 } from './secoes/Secao3'
import { Secao4 } from './secoes/Secao4'

export function Analises() {
    return (
     <div className={estilos.conteiner}>
            <Secao1 />
            <Secao2 />
            <Secao3 />
            <Secao4 />
    </div>
      
    )
}