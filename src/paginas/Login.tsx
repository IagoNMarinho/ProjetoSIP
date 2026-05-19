import estilos from './Login.module.css'
/*
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod 
*/


export function Login(){
    return(
        <div className={estilos.alinhamento}>
            <div className={estilos.conteiner1}>
                <form
                    className={estilos.formulario}
                    
                    >
                        <h1 className={estilos.titulo}>Login</h1>
                        <label>Username ou E-mail</label>
                        <input 
                            className={estilos.campo} 
                            placeholder='usuario123 ou usuario123@gmail.com'
                            />

                        <label>Senha</label>
                        <input 
                            className={estilos.campo} 
                            placeholder='****'
                            type='password'
                            />
                        <div className={estilos.senha}>
                            <p>Esqueceu a senha?</p>
                        </div>

                        <button
                            className={estilos.botao}
                            >
                                Entrar
                        </button>

                        <div className={estilos.cadastro}>
                            <p>Não possui login? Cadastre-se!</p>
                        </div>

                </form>
            </div>
            <div className={estilos.conteiner2}>
                <img src="src\assets\imagens\logo.png" alt="Aguato" />
            </div>
        </div>
    )
}