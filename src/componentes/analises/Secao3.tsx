import estilos from './Secao3.module.css'
import { FaCircle } from "react-icons/fa6";
import grafico from '../../assets/imagens/grafico.png'

import { useEffect, useState } from 'react'
import storageService from '../SIMULADOR/storageService'
import type { Analysis } from '../SIMULADOR/simulatorService';

export function Secao3() {

    const [analises, setAnalises] = useState<Analysis[]>([]) //função para puxar todas as análises do storageservice
    useEffect(()=>{
        setAnalises(
            storageService.getHistory()
        )
    },[])

    const analisesRecentes = analises.slice(0, 5)

    const nomeStatus = (
        status: Analysis["status"]
    )=>{
        if(status === "Potável"){
            return "Adequada"
        }
        if(status === "Atenção"){
            return "Pendente"
        }
        return "Crítica"
    }
    const classeStatus = (
        status: Analysis["status"]
    )=>{
        if(status === "Potável"){
            return estilos.adequada;
        }
        if (status === "Atenção"){
            return estilos.pendente
        }
        return estilos.critico
    }

    return (
        <div className={estilos.conteiner}>
            <div className={estilos.analises}>
                <div className={estilos.titulo}>
                    <h2>    
                        Histórico de análises
                    </h2>
                    <button>
                        Ver todas
                    </button>
                </div>

                {analisesRecentes.map((analise, index) => (
                    <div className={estilos.card} key={analise.id}>
                        <figure>
                            <img />
                        </figure>
                        <div className={estilos.box1}>
                            <h2>Análise #{index + 1}</h2>
                            <p>Local: {analise.location}</p>
                        </div>
                        <div className={estilos.box1}>
                            <p>{new Date(analise.date).toLocaleDateString("pt-BR")}</p>
                            <p>{new Date(analise.date).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: '2-digit'})}</p>
                        </div>
                        <div className={estilos.box2}>
                            <button className={classeStatus(analise.status)}>
                                <FaCircle/>
                                <span>{nomeStatus(analise.status)}</span>
                            </button>
                            <button className={estilos.detalhes}>
                                <span>Ver detalhes</span>
                            </button>
                        </div>

                    </div>
                ))}
                {analisesRecentes.length === 0 && (
                    <div className={estilos.card}>
                        <p>
                            Nenhuma análise realizada.
                        </p>
                    </div>

                )}

            </div>
            <div className={estilos.grafico}>
                <div className={estilos.titulo}>
                    <h2>    
                        Gráfico
                    </h2>
                    <button>
                        semana ^
                    </button>
                </div>
                <img src={grafico} />
            </div>
        </div>
    )
}