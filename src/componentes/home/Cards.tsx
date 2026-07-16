import estilos from './Cards.module.css'

import { PiPlugsConnectedFill } from "react-icons/pi"
import { AiOutlineMonitor } from "react-icons/ai"
import { HiBellAlert } from "react-icons/hi2"

export function Cards() {

    return (

        <section className={estilos.cardsSection}>

            <h2>Como funciona?</h2>

            <p className={estilos.descricao}>
                Em apenas três etapas você já pode acompanhar a qualidade da água
                de forma simples e segura.
            </p>

            <div className={estilos.cards}>

                <div className={estilos.card}>
                    <span className={estilos.numero}>1</span>
                    <PiPlugsConnectedFill className={estilos.icone}/>
                    <h3>Conecte</h3>
                    <p>
                        Conecte o dispositivo SIP ao reservatório para iniciar o
                        monitoramento.
                    </p>
                </div>

                <div className={estilos.card}>
                    <span className={estilos.numero}>2</span>
                    <AiOutlineMonitor className={estilos.icone}/>
                    <h3>Monitore</h3>
                    <p>
                        Visualize em tempo real informações sobre a qualidade da
                        água.
                    </p>
                </div>

                <div className={estilos.card}>
                    <span className={estilos.numero}>3</span>
                    <HiBellAlert className={estilos.icone}/>
                    <h3>Receba alertas</h3>
                    <p>
                        Seja avisado imediatamente caso algum parâmetro apresente
                        risco.
                    </p>
                </div>

            </div>

        </section>

    )

}