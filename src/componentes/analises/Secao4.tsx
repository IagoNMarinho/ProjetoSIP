import estilos from './Secao4.module.css'
import { CiTempHigh } from "react-icons/ci"
import { FaBottleWater } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { GiWaterBottle } from "react-icons/gi";


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
                    <span className={estilos.icone}>
                        <FaBottleWater />
                    </span>

                    <div className={estilos.dados}>
                        <h1>7,2</h1>
                        <h3>PH médio</h3>
                    </div>
        
                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <AiFillAlert />
                    </span>

                    <div className={estilos.dados}>
                        <h1>7,2</h1>
                        <h3>Turbidez médio</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <CiTempHigh />
                    </span>

                    <div className={estilos.dados}>
                        <h1>24,5ºC</h1>
                        <h3>Temperatura média</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <GiWaterBottle />
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