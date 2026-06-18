import { useNavigate } from 'react-router-dom'
import estilos from './Cadastro.module.css'
import login from '../assets/imagens/logo.png'

import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { type NovoUsuarioTipo } from '../tipos/NovoUsuario'

type FormValues = {
    nomeCompleto: string
    username: string
    email: string
    telefone: string
    cidade: string
    instituicao: string
    senha: string
    confsenha: string
}

const CadastroSchema = z.object({
    nomeCompleto: z.string().min(8, {
        message: 'Informe um Nome Completo com no mínimo 8 caracteres.'
    }),
    username: z.string().min(4,{
        message: 'Informe um Username com no mínimo 4 caracteres.'
    }),
    email: z.email({
        message: 'Informe um Email válido.'
    }),
    telefone: z.e164({
        message: 'Informe um Telefone válido.'
    }),
    cidade: z.string().min(6,{
        message: 'Informe uma cidade com no mínimo 6 caracteres'
    }),
    instituicao: z.string().min(10,{
        message: 'Informe uma instituição com no mínimo 10 caracteres.'
    }),
    senha: z.string().min(8,{
        message: 'Informe uma senha com no mínimo 8 caracteres.'
    }),
    confsenha: z.string().min(8,{
        message: 'Informe uma senha com no mínimo 8 caracteres.'
    })
}).refine((dados)=> dados.senha === dados.confsenha,{
    message:'As senhas não coincidem.',
    path:['confsenha']
})

export function Cadastro(){


    const { setEmailUsuarioContexto } = useContext(LayoutContexto)
    
    const{
        register, handleSubmit, formState:{errors}
    } = useForm<FormValues>(
        {resolver: zodResolver(CadastroSchema)}
    )
    
    const dadosUsuario: NovoUsuarioTipo = {
        nome: '',
        username: '',
        email: '',
        telefone: '',
        cidade: '',
        instituicao: '',
        senha: '',
        confsenha: ''
    }

    const autenticarUsuario = (data: FormValues) => {
        dadosUsuario.nome = data.nomeCompleto
        dadosUsuario.username = data.username
        dadosUsuario.email = data.email
        dadosUsuario.telefone = data.telefone
        dadosUsuario.cidade = data.cidade
        dadosUsuario.instituicao = data.instituicao
        dadosUsuario.senha = data.senha
        dadosUsuario.confsenha = data.confsenha 

        setEmailUsuarioContexto(dadosUsuario.email)
        navegacao('home')
    }

    const navegacao = useNavigate()
    const cadastro = () => {
        navegacao('/')
    }

    return(
        <div className={estilos.alinhamento}>
            <div className={estilos.conteiner1}>
                <form
                    className={estilos.formulario}
                    onSubmit={handleSubmit(autenticarUsuario)}
                    >
                        <h1 className={estilos.titulo}>Cadastro</h1>
                        <div className={estilos.inputs}>
                            <div className={estilos.inputgroup}  id={estilos.inteiro}>
                                <input 
                                    {...register('nomeCompleto')}
                                    className={estilos.campo} />
                                <label>Nome Completo</label>
                        { errors.nomeCompleto && <p className={estilos.mensagem}>{errors.nomeCompleto.message}</p> }
                            </div>
                            <div className={estilos.inputgroup}  id={estilos.metade}>
                                <input 
                                    {...register('username')}
                                    className={estilos.campo} />
                                <label>Username</label>
                        { errors.username && <p className={estilos.mensagem}>{errors.username.message}</p> }
                            </div>
                            <div className={estilos.inputgroup}  id={estilos.metade}>
                                <input 
                                    {...register('email')}
                                    className={estilos.campo} />
                                <label>E-mail</label>
                        { errors.email && <p className={estilos.mensagem}>{errors.email.message}</p> }
                            </div>
                            <div className={estilos.inputgroup}  id={estilos.metade}>
                                <input 
                                    {...register('telefone')}
                                    className={estilos.campo} />
                                <label>Telefone</label>
                        { errors.telefone && <p className={estilos.mensagem}>{errors.telefone.message}</p> }
                            </div>
                            <div className={estilos.inputgroup}  id={estilos.metade}>
                                <input 
                                    {...register('cidade')}
                                    className={estilos.campo} />
                                <label>Cidade</label>
                        { errors.cidade && <p className={estilos.mensagem}>{errors.cidade.message}</p> }
                            </div>
                            <div className={estilos.inputgroup}  id={estilos.inteiro}>
                                <input 
                                    {...register('instituicao')}
                                    className={estilos.campo} />
                                <label>Instituição</label>
                        { errors.email && <p className={estilos.mensagem}>{errors.email.message}</p> }
                            </div>

                            <div className={estilos.inputgroup}  id={estilos.inteiro}>
                                <input 
                                    {...register('senha')}
                                    className={estilos.campo}
                                    type='password' />
                                <label>Senha</label>
                        { errors.senha && <p className={estilos.mensagem}>{errors.senha.message}</p> }
                            </div>
                            <div className={estilos.inputgroup} 
                                id={estilos.inteiro}>
                                <input 
                                    {...register('confsenha')}
                                    className={estilos.campo}
                                    type='password'    />
                                <label>Confirmar Senha</label>
                        { errors.confsenha && <p className={estilos.mensagem}>{errors.confsenha.message}</p> }
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
                <img src={login} alt="Aguato" />
            </div>
        </div>
    )
}