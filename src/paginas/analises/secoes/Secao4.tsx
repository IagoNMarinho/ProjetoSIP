import estilos from './Secao4.module.css'
import { CiTempHigh } from "react-icons/ci"
import { FaBottleWater } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { GiWaterBottle } from "react-icons/gi";

import { useAnalises } from '../../../hooks/useAnalises';

export function Secao4() {

    const { analises } = useAnalises();

    //só calcula a media com os valores que existem de verdade, ignorando os sensores nao configurados ainda
    const media = (valores: (number | null)[]) => {
        const validos = valores.filter((valor): valor is number => valor !== null)
        if (validos.length === 0){
            return null
        }
        const soma = validos.reduce(
            (total, valor) => total + valor, 0
        )
        return soma / validos.length
    }

    const mediaPh = media(analises.map(analise => analise.ph))
    const mediaTurbidez = media(analises.map(analise => analise.turbidez))
    const mediaTemperatura = media(analises.map(analise => analise.temp))
    const mediaTds = media(analises.map(analise => analise.tds))

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
                        <h1>{mediaPh !== null ? mediaPh.toFixed(1) : "--"} </h1>
                        <h3>PH médio</h3>
                    </div>
        
                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <AiFillAlert />
                    </span>

                    <div className={estilos.dados}>
                        <h1>{mediaTurbidez !== null ? `${mediaTurbidez.toFixed(1)} NTU` : "--"}</h1>
                        <h3>Turbidez média</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <CiTempHigh />
                    </span>

                    <div className={estilos.dados}>
                        <h1>{mediaTemperatura !== null ? `${mediaTemperatura.toFixed(1)} ºC` : "--"}</h1>
                        <h3>Temperatura média</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <GiWaterBottle />
                    </span>

                    <div className={estilos.dados}>
                        <h1>{mediaTds !== null ? `${mediaTds.toFixed(1)} ppm` : "--"}</h1>
                        <h3>Sólidos dissolvidos médios</h3>
                    </div>

                </div>
            </div>

        </div>
    )
}