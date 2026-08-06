import estilos from './Contato.module.css'
import aguato from '../assets/imagens/logo.jpeg'

import { ModalMensagem } from '../componentes/ModalMensagem'

import { useState} from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FaPhone } from "react-icons/fa6"
import { ImInstagram } from "react-icons/im"
import { MdEmail } from "react-icons/md"

const contatoSchema = z.object({
    email: z.email({
        message: 'Informe um e-mail válido.'
    }),

    mensagem: z.string().min(12, {
        message: 'Informe uma mensagem com no mínimo 12 caracteres.'
    })
})

type FormValues = {
    email: string
    mensagem: string
}

export function Contato(){
    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTexto, setMensagemTexto] = useState("")
    const exibirModal = () => {
        setModalMensagemVisivel(true)
    }
    const ocultarModal = () => {
        setModalMensagemVisivel(false)
    }

    const {
        register, handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(contatoSchema),

        defaultValues: {
            email: "",
            mensagem: ""
        },
        mode: 'onChange'
    })

    const enviarMensagem = (data: FormValues) => {
        console.log("Dados enviados:", data)
        setMensagemTexto(
            `Mensagem enviada com sucesso! Em breve entraremos em contato pelo e-mail ${data.email}.`)
        exibirModal()
    }


    return(
        <main className={estilos.principal}>

            <h1>Fale conosco!</h1>

            <h3>
                Conheça nossos meios de comunicação
            </h3>

            <section className={estilos.conteiner}>

                <form onSubmit={handleSubmit(enviarMensagem)}>

                    <label htmlFor="email">
                        Email:
                    </label>

                    <input
                        {...register('email')}
                    />
                    {errors.email && (<p className={estilos.mensagem}>{errors.email.message}</p>)}

                    <label htmlFor="mensagem">
                        Mensagem:
                    </label>

                    <textarea
                        {...register('mensagem')}
                    />
                    {errors.mensagem && (<p className={estilos.mensagem}>{errors.mensagem.message}</p>)}
                    <button type="submit">
                        Enviar mensagem
                    </button>

                </form>

                <figure>
                    <img
                        src={aguato}
                        alt="Mascote Aguato do projeto SIP"
                    />
                </figure>

            </section>

            <section className={estilos.conteiner2}>

                <a 
                    className={estilos.box}>
                    <FaPhone />
                    <h1>
                        (+55) 19 1111111-1111
                    </h1>
                    <h3>
                        nosso número de telefone para contato direto
                    </h3>
                </a>

                <a
                    href="https://www.instagram.com/oprojetosip/"
                    target="_blank" //faz o Instagram abrir em uma nova aba
                    rel="noopener noreferrer" //aumenta a segurança da nova aba. evita enviar a origem da navegação
                    className={estilos.box}
                >
                    <ImInstagram />
                    <h1>
                        @oprojetosip
                    </h1>
                    <h3>
                        nossa página no Instagram para contato direto
                    </h3>
                </a>

                <a 
                    href="mailto:oprojetosip@gmail.com"
                    className={estilos.box}>
                    <MdEmail />
                    <h1>
                        oprojetosip@gmail.com
                    </h1>
                    <h3>
                        nosso e-mail para contato direto
                    </h3>
                </a>

            </section>

            <ModalMensagem
                exibir={modalMensagemVisivel}
                ocultar={ocultarModal}
                titulo="Contato"
                texto={modalMensagemTexto}
            />

        </main>
    )
}