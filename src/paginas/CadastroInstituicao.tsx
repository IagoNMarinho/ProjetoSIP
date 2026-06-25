import { useNavigate } from 'react-router-dom'
import estilos from './Cadastroinstituicao.module.css'
import login from '../assets/imagens/logo.png'

import { FaCircleUser } from "react-icons/fa6"
import { LuSchool } from "react-icons/lu"

import { ModalMensagem } from '../componentes/ModalMensagem'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LayoutContexto } from '../contextos/LayoutContexto'
import { type NovaInstituicaoTipo } from '../tipos/NovaInstituicao'

type FormValues = {
    nome: string
    cnpj: string
    email: string
    telefone: string
    senha: string
    confsenha: string
}

const CadastroSchema = z.object({
    nome: z.string().min(8, {
        message: 'Informe um Nome Completo com no mínimo 8 caracteres.'
    }),
    cnpj: z.string().regex(
        /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,{
        message:'O CNPJ deve seguir o formato 11.111.111/1111-11'
    }),
    email: z.email({
        message: 'Informe um Email válido.'
    }),
    telefone: z.e164({
        message: 'Informe um Telefone válido.'
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

export function CadastroInstituicao(){

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
    
    const dadosUsuario: NovaInstituicaoTipo = {
        nome: '',
        cnpj: '',
        email: '',
        telefone: '',
        senha: '',
        confsenha: ''
    }

    const autenticarInstituicao = (data: FormValues) => {
        dadosUsuario.nome = data.nome
        dadosUsuario.cnpj = data.cnpj
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
                    <button onClick={cadastroUsuario}>
                        <FaCircleUser/>
                        <span>
                            Usuário
                        </span>
                    </button>
                    <button onClick={cadastroInstituicao} id={estilos.focus}>
                        <LuSchool/>
                        <span>
                            Instituição
                        </span>
                    </button>
                </div>

                <form
                    className={estilos.formulario}
                    onSubmit={handleSubmit(autenticarInstituicao)}
                    >
                        <h1 className={estilos.titulo}>Cadastro Instituição</h1>
                        <div className={estilos.inputs}>
                            <div className={estilos.inputgroup}  id={estilos.inteiro}>
                                <input 
                                    {...register('nome')}
                                    className={estilos.campo} />
                                <label>Nome Completo</label>
                        { errors.nome && <p className={estilos.mensagem}>{errors.nome.message}</p> }
                            </div>
                            <div className={estilos.inputgroup}  id={estilos.inteiro}>
                                <input 
                                    {...register('cnpj')}
                                    className={estilos.campo} />
                                <label>CNPJ</label>
                        { errors.cnpj && <p className={estilos.mensagem}>{errors.cnpj.message}</p> }
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