import estilos from './Rodape.module.css'
import { useNavigate } from 'react-router-dom'

import { FaInstagram } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FaYoutube } from "react-icons/fa"

export function Rodape(){
    
    const navegacao = useNavigate()
    const home = () => {
        navegacao('/home')
    }
    const detectar = () => {
        navegacao('/detectar')
    }
    const gole = () => {
        navegacao('/gole')
    }
    const analises = () => {
        navegacao('/analises')
    }
    const sobre = () => {
        navegacao('/sobre')
    }
    const perfil = () => {
        navegacao('/perfil')
    }
    const configuracao = () => {
        navegacao('/configuracao')
    }
    
    return(
            <footer>
                <div className={estilos.ondas}>
                    <div className={`${estilos.onda} ${estilos.onda1}`}></div>
                    <div className={`${estilos.onda} ${estilos.onda2}`}></div>
                    <div className={`${estilos.onda} ${estilos.onda3}`}></div>
                    <div className={`${estilos.onda} ${estilos.onda4}`}></div>
                </div>
                <ul className={estilos.icones}>
                    <li>
                        <a 
                            href="https://www.instagram.com/oprojetosip/"
                            target="_blank" //faz o Instagram abrir em uma nova aba
                            rel="noopener noreferrer" //aumenta a segurança da nova aba. evita enviar a origem da navegação
                        >
                                <FaInstagram/>
                        </a>
                    </li>
                    <li><a href="#"><FaGithub/></a></li>
                    <li>
                        <a 
                            href="mailto:oprojetosip@gmail.com">
                                <MdEmail/>
                        </a>
                    </li>
                    <li><a href="#"><FaYoutube/></a></li>
                </ul>
                <ul className={estilos.menu}>
                    <button onClick={home}>Home</button>
                    <button onClick={detectar}>Detectar</button>
                    <button onClick={gole}>Gole+</button>
                    <button onClick={analises}>Análises</button>
                    <button onClick={sobre}>Sobre</button>
                    <button onClick={perfil}>Perfil</button>
                    <button onClick={configuracao}>Configuração</button>
                </ul>
                <p>Projeto SIP © Todos os direitos reservados.</p>
            </footer>
    )
} 