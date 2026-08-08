import estilos from './Home.module.css'
import { useNavigate } from 'react-router-dom'
import { Cards } from '../componentes/home/Cards'
import { Infos } from '../componentes/home/Infos'

export function Home() {

    const navegacao = useNavigate()
    const sobre = () => {
        navegacao('/sobre')
    }

    return (
        <main className={estilos.home}>
            <div className={estilos.conteiner}>
                <div className={estilos.intro}>
                    <h2 className={estilos.subtitulo}>Projeto</h2>
                    <div className={estilos.content}>
                        <h1>SIP</h1>
                        <h1>SIP</h1>
                    </div>
                        <p className={estilos.texto}>
                            Um sistema de monitoramento da potabilidade.
                        </p>
                        <p className={estilos.texto}>
                            Informações precisas para um consumo mais seguro.
                        </p>
                    <button 
                        onClick={sobre}
                        className={estilos.botao}>
                            Saiba mais
                    </button>
                </div>

                <div className={estilos.infos}>
                    <div className={estilos.box}>
                        <p className={estilos.texto2}>Já bebeu água hoje?</p>
                        <p className={estilos.texto}>
                            Acompanhe a qualidade da água em tempo real com o SIP. Tenha monitoramento inteligente, informações precisas e mais segurança para consumir água com tranquilidade.
                        </p>
                    </div>
                </div>

            </div>

            <div className={estilos.cardsSection}>
                < Cards />
            </div>

            <div className={estilos.infosSection}>
                < Infos />
            </div>

        </main>
    )
}