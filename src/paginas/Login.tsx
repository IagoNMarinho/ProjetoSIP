import { useNavigate } from 'react-router-dom'
import estilos from './Login.module.css'
import login from '../assets/imagens/logo.png'

/*
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod 
*/


export function Login(){

    const navegacao = useNavigate()
    const cadastro = () => {
        navegacao('cadastro')
    }

    const home = () => {
        navegacao('home')
    }

    return(
        <div className={estilos.alinhamento}>
            <div className={estilos.conteiner1}>
                <form
                    className={estilos.formulario}
                    
                    >
                        <h1 className={estilos.titulo}>Login</h1>
                        <div className={estilos.inputgroup}>
                            <input className={estilos.campo} required/>
                            <label>Username</label>
                        </div>

                        <div className={estilos.inputgroup}>
                            <input 
                                className={estilos.campo}
                                type='password' required/>
                            <label>Senha</label>
                        </div>
                        <div className={estilos.senha}>
                            <p>Esqueceu a senha?</p>
                        </div>

                        <button
                            className={estilos.botao}
                            onClick={home}
                            >
                                Entrar
                        </button>

                        <div className={estilos.cadastro}>
                            <p>Não possui login?</p>
                            <button 
                                className={estilos.novoUsuario}
                                onClick={cadastro}
                                >
                                    Cadastre-se!
                            </button>
                        </div>

                </form>
            </div>
            <div className={estilos.conteiner2}>
                <img src={login} alt="Aguato" />
            </div>
        </div>
    )
}