/*O React Hook Form controla os campos e captura os dados, enquanto o Zod valida se esses dados seguem as regras definidas. 
Se estiver tudo correto, o formulário envia os dados; se não, ele bloqueia o envio e mostra os erros para o usuário. */

import { useNavigate } from 'react-router-dom'
import estilos from './LoginUsuario.module.css'
import login from '../assets/imagens/logo.png'

import { ModalMensagem } from '../componentes/ModalMensagem'

import { FaCircleUser } from "react-icons/fa6"
import { LuSchool } from "react-icons/lu"

import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' 
import { type UsuarioTipo } from '../tipos/Usuario'
import { type GoogleUser } from '../tipos/GoogleUser'

import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode' /*lê o conteúdo do token(credencial digital que representa a autenticação do usuário) e o transforma em um objeto JavaScript para que você possa acessar essas informações */

type FormValues = {
    tipo: 'usuario' | 'instituicao'
    email: string
    senha: string
}

const loginSchema = z.object({
    tipo: z.enum(['usuario', 'instituicao'], {message: 'Selecione o tipo de login.'}),
    email: z.email({message: 'Informe um e-mail válido.'}),
    senha: z.string().min(8, {message: 'Informe uma senha com no mínimo 8 caracteres.'})
})

import { UsuarioContexto } from '../contextos/UsuarioContexto'

export function LoginUsuario(){

    const { usuarioGoogle, setUsuarioGoogle } = useContext(UsuarioContexto);

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTexto, setMensagemTexto] = useState("")

    const exibirModal = () => setModalMensagemVisivel(true)
    const ocultarModal = () => {
        setModalMensagemVisivel(false)
        navegacao('/home')
    }

    const{
        register, handleSubmit, formState:{errors}
    } = useForm<FormValues>(
        {resolver: zodResolver(loginSchema)}
    )

    const dadosUsuario: UsuarioTipo = {
        tipo: '',
        nome: '',
        email: '',
        senha: ''
    }

    const autenticarUsuario = (data: FormValues) => {
        dadosUsuario.tipo = data.tipo
        dadosUsuario.email = data.email 
        dadosUsuario.senha = data.senha 

        setMensagemTexto(`Login realizado com sucesso! Bem-vindo, ${data.email}!`)
        exibirModal()
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

                        <div className={estilos.tipologin}>
                                <input 
                                    {...register('tipo')}
                                    className={estilos.radio} 
                                    type='radio'
                                    id='usuario'
                                    value="usuario"/>
                                <label
                                    htmlFor="usuario" 
                                    className={estilos.radioLabel}>
                                        <FaCircleUser />
                                        Usuário
                                    </label>
                            
                                <input 
                                    {...register("tipo")}
                                    id="instituicao"
                                    value="instituicao"
                                    type="radio"
                                    className={estilos.radio}/>
                                <label
                                    htmlFor="instituicao" 
                                    className={estilos.radioLabel}>
                                        <LuSchool />
                                        Instituição
                                    </label>
                        </div>
                        { errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p> }
                        
                        <div className={estilos.inputgroup}>
                            <input 
                                {...register('email')}
                                className={estilos.campo} />
                            <label>Email</label>
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

                        <div className={estilos.google}>
                            <p>Ou faça login com:</p>
                            <GoogleLogin 
                                theme='filled_blue'
                                onSuccess={(credentialResponse) => { 
                                    /* Verifica se a credencial existe antes de decodificá-la. Caso contrário, ocorrerá um erro, pois para o TypeScript a propriedade `credential` 
                                    é opcional (pode ser uma `string` ou `undefined`), enquanto o `jwtDecode()` espera receber apenas uma `string`. */
                                    if (!credentialResponse.credential) {
                                        console.log("Token não recebido.");
                                    return;
                                    }

                                const usuario = jwtDecode<GoogleUser>(credentialResponse.credential);
                                setUsuarioGoogle(usuario); 
                                /* O jwtDecode converte o token JWT retornado pelo Google em um objeto com as informações do usuário. 
                                Esses dados são armazenados na constante `usuario` e tipados como `GoogleUser`. */
                                
                                setUsuarioGoogle(usuario);

                                console.log(credentialResponse);
                                console.log(usuario);
                                setMensagemTexto(`Login realizado com sucesso! Bem-vindo, ${usuario.name}!`)
                                exibirModal()
                                }}

                                onError={() => console.log("Falha no login.")}
                                auto_select={true}
                            />
                        </div>

                </form>
            </div>

            <ModalMensagem 
                exibir={modalMensagemVisivel}
                ocultar={() => ocultarModal()}
                titulo='Autenticação'
                texto={modalMensagemTexto}
                foto={usuarioGoogle?.picture}
            />

            <div className={estilos.conteiner2}>
                <img src={login} alt="Aguato" />
            </div>
        </div>
    )
}