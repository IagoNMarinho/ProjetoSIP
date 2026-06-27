import estilos from './Secao1.module.css'
import analise from '../../assets/imagens/logo.png'

export function Secao1() {
    return (
        <div className={estilos.conteiner}>
            <figure>
                <img src={analise}/>
            </figure>
            <div className={estilos.caixatexto}>
                <h1>
                    Bem-vindo!
                </h1>
                <span>
                    Aqui você terá acesso a todo o histórico de análises realizadas pelo usuário!
                </span>
            </div>
        </div>
    )
}