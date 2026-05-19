import { useNavigate } from 'react-router-dom'
import estilos from './Cadastro.module.css'
import cadastro from '../assets/imagens/logo.png'
/*
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod 
*/


export function Cadastro(){

    const navegacao = useNavigate()

    return(
        <div className={estilos.alinhamento}>
            <div className={estilos.conteiner1}>
                <form
                    className={estilos.formulario}
                    
                    >
                        <h1 className={estilos.titulo}>Cadastro</h1>
                        <div className={estilos.inputs}>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>Nome Completo</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>Username</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>E-mail</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>Username</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>Telefone</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>Cidade</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input className={estilos.campo} required/>
                                <label>Instituição</label>
                            </div>

                            <div className={estilos.inputgroup}>
                                <input 
                                    className={estilos.campo}
                                    type='password' required/>
                                <label>Senha</label>
                            </div>
                            <div className={estilos.inputgroup}>
                                <input 
                                className={estilos.campo}
                                type='password' required/>
                                <label>Confirmar Senha</label>
                            </div>
                        </div>

                        <button
                            className={estilos.botao}
                            >
                                Cadastrar
                        </button>


                </form>
            </div>
            <div className={estilos.conteiner2}>
                <img src={cadastro} alt="Aguato" />
            </div>
        </div>
    )
}