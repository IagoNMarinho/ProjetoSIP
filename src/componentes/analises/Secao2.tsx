import estilos from './Secao2.module.css'
import { FaFlask } from "react-icons/fa"
import { MdHealthAndSafety } from "react-icons/md"
import { IoIosAlert } from "react-icons/io"
import { MdDangerous } from "react-icons/md"

import { useEffect, useState } from 'react'
import storageService from '../SIMULADOR/storageService'

export function Secao2() {

    const [stats, setStats] = useState({
        total: 0,
        potavel: 0,
        atencao: 0,
        critica: 0
    })

    useEffect(()=>{
        setStats(storageService.getStatistics())
    },[])

    return (
        <div className={estilos.conteiner}>
            
            <div className={estilos.box}>
                <span className={estilos.total}>
                    <FaFlask />
                </span>

                <div className={estilos.dados}>
                    <h1>{stats.total}</h1>
                    <h3>Análises completas</h3>
                </div>

            </div>

            <div className={estilos.box}>
                <span className={estilos.seguras}>
                    <MdHealthAndSafety />
                </span>

                <div className={estilos.dados}>
                    <h1>{stats.potavel}</h1>
                    <h3>Análises adequadas</h3>
                </div>

            </div>

            <div className={estilos.box}>
                <span className={estilos.alerta}>
                    <IoIosAlert />
                </span>

                <div className={estilos.dados}>
                    <h1>{stats.atencao}</h1>
                    <h3>Análises pendentes</h3>
                </div>

            </div>

            <div className={estilos.box}>
                <span className={estilos.critica}>
                    <MdDangerous />
                </span>

                <div className={estilos.dados}>
                    <h1>{stats.critica}</h1>
                    <h3>Análises críticas</h3>
                </div>

            </div>

        </div>
    )
}