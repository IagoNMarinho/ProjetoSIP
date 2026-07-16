import estilos from './Infos.module.css'
import arduino from '../../assets/imagens/arduino.jpg'
import aguato from '../../assets/imagens/FotoArthur.jpeg'

import { useNavigate } from 'react-router-dom'

import { FaFlask } from "react-icons/fa"
import { MdHealthAndSafety } from "react-icons/md"
import { IoIosAlert } from "react-icons/io"
import { TbPlugConnected } from "react-icons/tb"
import { FaCalendarWeek } from "react-icons/fa"

export function Infos() {

    const navegacao = useNavigate()
    const analises = () => {
        navegacao('/analises')
    }

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
                                        <h1 className={estilos.t1}>07</h1>
                                        <h3 className={estilos.t2}>Análises concluídas</h3>
                                    </div>
                                </div>

                                <div className={estilos.box}>
                                    <span className={estilos.alerta}>
                                        <IoIosAlert />
                                    </span>

                                <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>04</h1>
                                        <h3 className={estilos.t2}>Análises em alerta</h3>
                                    </div>
                                </div>

                                <div className={estilos.box}>
                                    <span className={estilos.semana}>
                                        <FaCalendarWeek />
                                    </span>
                                    <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>01</h1>
                                        <h3 className={estilos.t2}>Análises da semana</h3>
                                    </div>
                                </div>

                                <div className={estilos.box}>
                                    <span className={estilos.adequado}>
                                        <MdHealthAndSafety />
                                    </span>

                                    <div className={estilos.dados}>
                                        <h1 className={estilos.t1}>02</h1>
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
                                 texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                 texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                  texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                   texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                    texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                     texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                      texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                                      
                            </p>
                            <p>
                                 texto texto texto texto texto texto texto texto texto texto texto texto texto texto
                            </p>
                            <p>
                                 texto texto texto texto texto texto texto texto texto texto texto texto texto texto
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