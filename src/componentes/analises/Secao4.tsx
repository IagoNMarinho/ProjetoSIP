import estilos from './Secao4.module.css'
import { CiTempHigh } from "react-icons/ci"
import { FaBottleWater } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { GiWaterBottle } from "react-icons/gi";

import { useEffect, useState } from 'react'
import storageService from '../SIMULADOR/storageService'
import type { Analysis } from '../SIMULADOR/simulatorService';

export function Secao4() {

    const [analises, setAnalises] = useState<Analysis[]>([])
    useEffect(() => {
        setAnalises(
            storageService.getHistory()
        )
    },[])

    const media = (valores: number[]) => {
        if(valores.length === 0){
            return 0
        }

        const soma = valores.reduce(
            (total, valor) => total+ valor, 0
        )
        return soma / valores.length
    }

    const mediaPh = media(
        analises.map(
            analise => analise.sensors.ph
        )
    )

    const mediaTurbidez = media(
        analises.map(
            analise => analise.sensors.turbidity
        )
    )

    const mediaTemperatura = media(
        analises.map(
            analise => analise.sensors.temperature
        )
    )

    const mediaTds = media(
        analises.map(
            analise => analise.sensors.tds
        )
    )

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
                        <h1>{mediaPh.toFixed(1)} </h1>
                        <h3>PH médio</h3>
                    </div>
        
                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <AiFillAlert />
                    </span>

                    <div className={estilos.dados}>
                        <h1>{mediaTurbidez.toFixed(1)} NTU</h1>
                        <h3>Turbidez média</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <CiTempHigh />
                    </span>

                    <div className={estilos.dados}>
                        <h1>{mediaTemperatura.toFixed(1)} ºC</h1>
                        <h3>Temperatura média</h3>
                    </div>

                </div>

                <div className={estilos.box}>
                    <span className={estilos.icone}>
                        <GiWaterBottle />
                    </span>

                    <div className={estilos.dados}>
                        <h1>{mediaTds.toFixed(1)} mg/L</h1>
                        <h3>Sólidos dissolvidos médios</h3>
                    </div>

                </div>
            </div>

        </div>
    )
}