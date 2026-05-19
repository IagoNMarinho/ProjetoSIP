import { useNavigate } from 'react-router-dom'
import estilos from './Cadastro.module.css'
/*
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod 
*/


export function Cadastro(){

    const navegacao = useNavigate()

    return(
        <div className={estilos.fundo}>
            <div className={estilos.conteiner}>
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
                                >
                                    Cadastre-se!
                            </button>
                        </div>

                </form>
            </div>
        </div>
    )
}