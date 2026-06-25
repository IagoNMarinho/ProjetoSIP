import estilos from './Home.module.css'
import { useNavigate } from 'react-router-dom'

export function Home() {

    const navegacao = useNavigate()
    const sobre = () => {
        navegacao('/sobre')
    }

    return (
        <div className={estilos.conteiner}>
            <div className={estilos.intro}>
                <h2 className={estilos.subtitulo}>Projeto</h2>
                <h1 className={estilos.titulo}>SIP</h1>
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
                    <p className={estilos.texto}>Acompanhe a qualidade da água em tempo real e consuma com tranquilidade.</p>
                </div>
            
            </div>
        </div>
    )
}