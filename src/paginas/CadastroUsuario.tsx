import { useNavigate } from 'react-router-dom'
import estilos from './CadastroUsuario.module.css'
import login from '../assets/imagens/logo.png'

import { FaCircleUser } from "react-icons/fa6"
import { LuSchool } from "react-icons/lu"

import { ModalMensagem } from '../componentes/ModalMensagem'

import { useState } from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { type NovoUsuarioTipo } from '../tipos/NovoUsuario'

type FormValues = {
    nomeCompleto: string
    username: string
    cpf: string
    email: string
    telefone: string
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
    cpf: z.string().regex(/^\d{11}$/,{
        message: 'O CPF deve conter 11 números.'
    }),
    email: z.email({
        message: 'Informe um Email válido.'
    }),
    telefone: z.string().regex(/^\d{11}$/,{
        message: 'Telefone deve conter 11 números.'
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

export function CadastroUsuario(){

    const { setEmailUsuarioContexto } = useContext(LayoutContexto)
    
    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTexto, setMensagemTexto] = useState("")

    const exibirModal = () => setModalMensagemVisivel(true)
    const ocultarModal = () => {
        setModalMensagemVisivel(false)
        navegacao('/')
    }

    const{
        register, handleSubmit, formState:{errors}
    } = useForm<FormValues>(
        {resolver: zodResolver(CadastroSchema)}
    )
    
    const dadosUsuario: NovoUsuarioTipo = {
        nome: '',
        username: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        confsenha: ''
    }

    const autenticarUsuario = (data: FormValues) => {
        dadosUsuario.nome = data.nomeCompleto
        dadosUsuario.username = data.username
        dadosUsuario.cpf = data.cpf
        dadosUsuario.email = data.email
        dadosUsuario.telefone = data.telefone
        dadosUsuario.senha = data.senha
        dadosUsuario.confsenha = data.confsenha 

        setMensagemTexto(`Cadastro realizado com sucesso! Bem-vindo, ${data.email}!`)
        exibirModal()

        setEmailUsuarioContexto(dadosUsuario.email)
    }

    const navegacao = useNavigate()
    
    const cadastroUsuario = () =>{
        navegacao('/cadastro')
    }
    const cadastroInstituicao = () =>{
        navegacao('/cadastroinstituicao')
    }

    return(
        <div className={estilos.alinhamento}>
            <div className={estilos.conteiner1}>

                <div className={estilos.tipoLogin}>
                    <button onClick={cadastroUsuario} id={estilos.focus}>
                        <FaCircleUser/>
                        <span>
                            Usuário
                        </span>
                    </button>
                    <button onClick={cadastroInstituicao}>
                        <LuSchool/>
                        <span>
                            Instituição
                        </span>
                    </button>
                </div>

                <form
                    className={estilos.formulario}
                    onSubmit={handleSubmit(autenticarUsuario)}
                    >
                        <h1 className={estilos.titulo}>Cadastro Usuário</h1>
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
                                    {...register('cpf')}
                                    className={estilos.campo} />
                                <label>CPF</label>
                                { errors.cpf && <p className={estilos.mensagem}>{errors.cpf.message}</p> }

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
                                    {...register('senha')}
                                    className={estilos.campo}
                                    type='password' />
                                <label>Senha</label>
                                { errors.senha && <p className={estilos.mensagem}>{errors.senha.message}</p> }

                            </div>

                            <div className={estilos.inputgroup}
                                id={estilos.metade}>
                                
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

            <ModalMensagem 
                exibir={modalMensagemVisivel}
                ocultar={() => ocultarModal()}
                titulo='Autenticação'
                texto={modalMensagemTexto}
            />

            <div className={estilos.conteiner2}>
                <img src={login} alt="Aguato" />
            </div>
        </div>
    )
}