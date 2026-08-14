import estilos from './Infos.module.css'
import arduino from '../../assets/imagens/arduino.jpg'
import aguato from '../../assets/imagens/aguato-mascote-removebg-preview.png'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import storageService from '../SIMULADOR/storageService'

import { FaFlask } from "react-icons/fa"
import { MdHealthAndSafety } from "react-icons/md"
import { IoIosAlert } from "react-icons/io"
import { TbPlugConnected } from "react-icons/tb"
import { MdDangerous } from "react-icons/md"

export function Infos() {

    const navegacao = useNavigate()
    const analises = () => {
        navegacao('/analises')
    }

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
            <section className={estilos.sectionInfos}>
                <h2>Destaques</h2>
                <p className={estilos.descricao}>
                    Resumo rápido e geral dos principais destaques da semana!
                </p>
                <div className={estilos.infos}>
                    <div className={estilos.colunaEsquerda}>

                        <div className={estilos.cardProduto}>
                            <img src={arduino}/>
                            <div className={estilos.sensor}>
                                <h3 className={estilos.t1}>Adquira nosso Sensor SIP!</h3>
                                <p>
                                    Como a comunicação entre o hardware e a aplicação ainda
                                    não foi definida, esta página permanecerá em
                                    desenvolvimento até que sejam estabelecidos o método de
                                    integração, o protocolo de comunicação e o envio dos
                                    dados para a aplicação.
                                </p>
                            </div>
                            <button className={estilos.botao}>
                                Adquira aqui
                            </button>
                        </div>

                        <div className={estilos.dashboard}>
                                <div className={estilos.dashUP}>
                                    <h3 className={estilos.t1}>Dahboard SIP</h3>
                                    <div className={estilos.connect}>
                                        <span>
                                            <TbPlugConnected />
                                        </span>
                                        <p>
                                            Dispositivo #004 conectado
                                        </p>
                                    </div>
                                </div>
                            <div className={estilos.dados}>
                                <div className={estilos.box}>
                                    <span className={estilos.total}>
                                        <FaFlask />
                                    </span>

                                    <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>{stats.total}</h1>
                                        <h3 className={estilos.t2}>Análises concluídas</h3>
                                    </div>
                                </div>

                                <div className={estilos.box}>
                                    <span className={estilos.alerta}>
                                        <IoIosAlert />
                                    </span>

                                <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>{stats.atencao}</h1>
                                        <h3 className={estilos.t2}>Análises pendentes</h3>
                                    </div>
                                </div>

                                <div className={estilos.box}>
                                    <span className={estilos.critico}>
                                        <MdDangerous />
                                    </span>
                                    <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>{stats.critica}</h1>
                                        <h3 className={estilos.t2}>Análises críticas</h3>
                                    </div>
                                </div>

                                <div className={estilos.box}>
                                    <span className={estilos.adequado}>
                                        <MdHealthAndSafety />
                                    </span>

                                    <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>{stats.potavel}</h1>
                                        <h3 className={estilos.t2}>Resultado adequado</h3>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={analises}
                                className={estilos.botao}>
                                ver detalhes
                            </button>
                        </div>
                    </div>
                    <div className={estilos.colunaDireita}>

                        <div className={estilos.balao}>
                            <h3 className={estilos.t1}>
                                Reflexão de aguato
                            </h3>
                            <p>
                                Se for desenvolvido um sistema composto por um detector de qualidade hídrica integrado a um software interativo, portátil e informativo, então será possível detectar previamente a presença de agentes contaminantes em reservatórios de água utilizados em ambientes acadêmicos, com destaque para escolas rurais, reduzindo os riscos à saúde dos usuários.       
                            </p>
                            <p>
                                Além disso, a disponibilização de informações em tempo real sobre a qualidade da água poderá auxiliar gestores, funcionários e estudantes na adoção de medidas preventivas mais rápidas e eficazes, contribuindo para a promoção da saúde coletiva e para a redução da exposição a doenças transmitidas pela água contaminada.
                            </p>
                            <p>
                                Espera-se também que a utilização do sistema favoreça a conscientização sobre a importância do monitoramento hídrico, incentivando práticas mais seguras relacionadas ao consumo e à gestão dos recursos hídricos dentro do ambiente escolar. 
                            </p>
                        </div>

                        <div className={estilos.aguato}>
                            <img src={aguato}/>
                        </div>

                    </div>
                </div>
            </section>
    )

}