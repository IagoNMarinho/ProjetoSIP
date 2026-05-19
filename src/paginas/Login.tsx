import { useNavigate } from 'react-router-dom'
import estilos from './Login.module.css'
/*
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod 
*/


export function Login(){

    const navegacao = useNavigate()
    const cadastro = () => {
        navegacao('cadastro')
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
                <img src="src\assets\imagens\logo.png" alt="Aguato" />
            </div>
        </div>
    )
}