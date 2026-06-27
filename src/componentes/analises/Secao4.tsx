import estilos from './Secao4.module.css'
import { FaFlask } from "react-icons/fa"
import { MdHealthAndSafety } from "react-icons/md"
import { IoIosAlert } from "react-icons/io"
import { MdDangerous } from "react-icons/md";

export function Secao4() {
    return (
        <div className={estilos.conteiner}>
            
            <div className={estilos.titulo}>
                <h2>    
                    Médias por parâmetros
                </h2>
            </div>
            
            <div className={estilos.conteiner2}>
                    
                <div className={estilos.box}>
                    <span className={estilos.total}>
                        <FaFlask />
                    </span>

                    <div className={estilos.dados}>
                        <h1>7,2</h1>
                        <h3>PH médio</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.seguras}>
                        <MdHealthAndSafety />
                    </span>

                    <div className={estilos.dados}>
                        <h1>7,2</h1>
                        <h3>Turbidez médio</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.alerta}>
                        <IoIosAlert />
                    </span>

                    <div className={estilos.dados}>
                        <h1>24,5ºC</h1>
                        <h3>Temperatura média</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.critica}>
                        <MdDangerous />
                    </span>

                    <div className={estilos.dados}>
                        <h1>335,2 mg/L</h1>
                        <h3>Sólidos dissolvidos médio</h3>
                    </div>

                </div>
            </div>

        </div>
    )
}