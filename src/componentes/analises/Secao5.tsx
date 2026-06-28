import estilos from './Secao5.module.css'
import analise from '../../assets/imagens/logo.png'
import ANA from '../../assets/imagens/logoANA.png'

export function Secao5() {
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
                    Aqui você terá acesso a análises realizadas pelo bando de dados abertos da API ANA (Agência Nacional de Águas e Saneamento Básico). 
                </span>
            </div>
            <figure>
                <img src={ANA}/>
            </figure>
        </div>
    )
}