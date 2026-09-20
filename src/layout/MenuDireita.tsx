import estilos from './MenuDireita.module.css'
import {
    CgUserList, CgUserAdd,
    CgTime, CgComment, CgHeart, 
    CgChevronDown, CgCheckO, CgProfile} from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { autenticacao } from '../firebase/FirebaseConexao'

export function MenuDireita() {

    const location = useLocation()

    const [nomeUsuario, setNomeUsuario] =
        useState('Usuário')

    const [identificacaoUsuario, setIdentificacaoUsuario] =
        useState('')


    useEffect(() => {

        const usuarioAuth =
            autenticacao.currentUser

        if (!usuarioAuth) {
            setNomeUsuario('Usuário')
            setIdentificacaoUsuario('')
            return
        }

        setNomeUsuario(
            usuarioAuth.displayName ||
            'Usuário'
        )

        setIdentificacaoUsuario(
            usuarioAuth.email ||
            ''
        )

    }, [])


    const perfilAtivo =
        location.pathname === '/perfil'

    const amizadeAtiva =
        location.pathname.startsWith('/amigos')


    return (

        <aside className={estilos.conteiner}>

            <Link
                to="/perfil"
                className={`${estilos.botaoPerfil} ${
                    perfilAtivo
                        ? estilos.botaoPerfilAtivo
                        : ''
                }`}
            >

                <div className={estilos.usuario}>

                    <div className={estilos.avatar}>

                        <CgProfile />

                    </div>


                    <div className={estilos.dadosUsuario}>

                        <strong>
                            {nomeUsuario}
                        </strong>

                        <span>
                            {identificacaoUsuario}
                        </span>

                    </div>

                </div>

            </Link>


            <div className={estilos.divisor} />


            <section className={estilos.secao}>

                <span className={estilos.tituloSecao}>
                    AMIZADES
                </span>


                <div
                    className={`${estilos.amizades} ${
                        amizadeAtiva
                            ? estilos.amizadesAtiva
                            : ''
                    }`}
                >


                    <div className={estilos.itemAmizades}>

                        <div className={estilos.icone}>

                            <CgUserList />

                        </div>


                        <div className={estilos.conteudoItem}>

                            <span>
                                Amizades
                            </span>

                            <small>
                                Gerenciar amizades
                            </small>

                        </div>


                        <CgChevronDown
                            className={estilos.seta}
                        />

                    </div>

                    <div className={estilos.submenu}>


                        <Link
                            to="/amigos"
                            className={estilos.subItem}
                        >

                            <CgUserList />

                            <span>
                                Meus amigos
                            </span>

                        </Link>


                        <Link
                            to="/amigos/add"
                            className={estilos.subItem}
                        >

                            <CgUserAdd />

                            <span>
                                Adicionar amigos
                            </span>

                        </Link>


                        <Link
                            to="/amigos/pendentes"
                            className={estilos.subItem}
                        >

                            <CgTime />

                            <span>
                                Solicitações
                            </span>

                            <strong
                                className={
                                    estilos.contador
                                }
                            >
                                3
                            </strong>

                        </Link>


                    </div>

                </div>

            </section>

            <section className={estilos.secao}>

                <div className={estilos.tituloComContador}>

                    <span className={estilos.tituloSecao}>
                        NOTIFICAÇÕES
                    </span>

                    <span className={estilos.contadorTitulo}>
                        3
                    </span>

                </div>


                <div className={estilos.painel}>

                    <div className={estilos.notificacao}>

                        <div
                            className={
                                estilos.iconeNotificacao
                            }
                        >

                            <CgUserAdd />

                        </div>


                        <div>

                            <strong>
                                Nova solicitação
                            </strong>

                            <span>
                                Você recebeu uma solicitação
                            </span>

                        </div>

                    </div>

                    <div className={estilos.notificacao}>

                        <div
                            className={
                                estilos.iconeNotificacao
                            }
                        >

                            <CgComment />

                        </div>

                        <div>
                            <strong>
                                Análise compartilhada
                            </strong>

                            <span>
                                Você compartilhou 6 análises
                            </span>
                        </div>
                    </div>

                    <div className={estilos.notificacao}>

                        <div
                            className={
                                estilos.iconeNotificacao
                            }
                        >
                            <CgHeart />
                        </div>

                        <div>
                            <strong>
                                Nova interação
                            </strong>

                            <span>
                                Alguém interagiu com você
                            </span>
                        </div>
                    </div>
                </div>

            </section>

            <section className={estilos.secao}>

                <span className={estilos.tituloSecao}>
                    ATIVIDADE
                </span>
                <div className={estilos.painel}>


                    <div className={estilos.atividade}>

                        <div
                            className={
                                estilos.linhaAtividade
                            }
                        />

                        <div
                            className={
                                estilos.iconeAtividade
                            } >

                            <CgCheckO />

                        </div>

                        <div
                            className={
                                estilos.conteudoAtividade
                            }
                        >

                            <strong>
                                Você adicionou um amigo
                            </strong>

                            <span>
                                Há 10 minutos
                            </span>
                        </div>
                    </div>

                    <div className={estilos.atividade}>

                        <div
                            className={
                                estilos.linhaAtividade
                            }
                        />


                        <div
                            className={
                                estilos.iconeAtividade
                            }
                        >

                            <CgHeart />

                        </div>

                        <div
                            className={
                                estilos.conteudoAtividade
                            }>

                            <strong>
                                Nova interação
                            </strong>

                            <span>
                                Há 35 minutos
                            </span>

                        </div>
                    </div>

                    <div className={estilos.atividade}>

                        <div
                            className={
                                estilos.linhaAtividade
                            } />

                        <div
                            className={
                                estilos.iconeAtividade
                            }
                        >

                            <CgComment />

                        </div>


                        <div
                            className={
                                estilos.conteudoAtividade
                            }
                        >

                            <strong>
                                Nova detecção                            </strong>

                            <span>
                                Há 1 hora
                            </span>

                        </div>
                    </div>
                </div>
            </section>
        </aside>

    )
}