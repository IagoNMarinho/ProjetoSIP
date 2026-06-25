import estilos from './Rodape.module.css'
import logo from '../assets/imagens/logo.png'

export function Rodape(){
    return(
        <footer  className={estilos.conteiner}>
            <div className={estilos.topo}>
                <img src={logo} className={estilos.logo} />

                <div className={estilos.titulos}>
                    <h1>Projeto SIP</h1>
                    <p>Controle de monitoramento de qualidade da água.</p>
                </div>
            </div>
            <h3 className={estilos.copyright}>
                <span>Projeto SIP © Todos os direitos reservados.</span>
            </h3>
        </footer>
    )
} 