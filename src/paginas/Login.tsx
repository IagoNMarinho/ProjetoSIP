/*O React Hook Form controla os campos e captura os dados, enquanto o Zod valida se esses dados seguem as regras definidas. 
Se estiver tudo correto, o formulário envia os dados; se não, ele bloqueia o envio e mostra os erros para o usuário. */

import { useNavigate } from 'react-router-dom'
import estilos from './Login.module.css'
import login from '../assets/imagens/logo.png'

import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 
import { LayoutContexto } from '../contextos/LayoutContexto'
import { type UsuarioTipo } from '../tipos/Usuario'

type FormValues = {
    email: string
    senha: string
}

const loginSchema = z.object({
    email: z.email({message: 'Informe um e-mail válido'}),
    senha: z.string().min(8, {message: 'Informe uma senha com no mínimo 8 caracteres.'})
})

export function Login(){

    const { setEmailUsuarioContexto } = useContext(LayoutContexto)

    const{
        register, handleSubmit, formState:{errors}
    } = useForm<FormValues>(
        {resolver: zodResolver(loginSchema)}
    )

    const dadosUsuario: UsuarioTipo = {
        nome: '',
        email: '',
        senha: ''
    }

    const autenticarUsuario = (data: FormValues) => {
        dadosUsuario.email = data.email 
        dadosUsuario.senha = data.senha 

        setEmailUsuarioContexto(dadosUsuario.email)
        navegacao('home')
    }

    const navegacao = useNavigate()
    const cadastro = () => {
        navegacao('cadastro')
    }

    return(
        <div className={estilos.alinhamento}>
            <div className={estilos.conteiner1}>
                <form
                    className={estilos.formulario}
                    onSubmit={handleSubmit(autenticarUsuario)}
                    >
                        <h1 className={estilos.titulo}>Login</h1>
                        <div className={estilos.inputgroup}>
                            <input 
                                {...register('email')}
                                className={estilos.campo} />
                            <label>Username</label>
                        { errors.email && <p className={estilos.mensagem}>{errors.email.message}</p> }
                        </div>

                        <div className={estilos.inputgroup}>
                            <input 
                                {...register('senha')}
                                className={estilos.campo}
                                type='password' />
                            <label>Senha</label>
                        { errors.senha && <p className={estilos.mensagem}>{errors.senha.message}</p> }

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
                <img src={login} alt="Aguato" />
            </div>
        </div>
    )
}