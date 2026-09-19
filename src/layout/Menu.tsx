import estilos from './Menu.module.css'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Submenu } from './Submenu'
import { Suporte } from '../componentes/SUPORTE/Suporte'

import { FaHome } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoIosStats } from "react-icons/io"
import { FaBook } from "react-icons/fa"
import { IoIosSettings } from "react-icons/io"
import { FaQuestion } from "react-icons/fa"

export function Menu() {

    const location = useLocation()

    const [modalAberto, setModalAberto] = useState(false)

    function exibirModal() {
        setModalAberto(true)
    }

    function ocultarModal() {
        setModalAberto(false)
    }

    return (
        <aside className={estilos.conteiner}>



            <nav>

                <Link
                    to="/home"
                    title="Home"
                    className={`${estilos.itemConteiner} ${
                        location.pathname === "/home"
                            ? estilos.ativo
                            : ""
                    }`}
                >
                    <FaHome />

                    <span className={estilos.tooltip}>
                        Home
                    </span>
                </Link>


                <Submenu
                    icone={<FaMagnifyingGlass />}
                    rota="/detectar"
                    titulo="Detectar"
                    itens={[
                        {
                            titulo: "Sensor SIP",
                            rota: "/sensorsip"
                        },
                        {
                            titulo: "ADD Reservátorio",
                            rota: "/addreservatorio"
                        }
                    ]}
                />


                <Submenu
                    icone={<IoIosStats />}
                    rota="/analises"
                    titulo="Análises"
                    itens={[
                        {
                            titulo: "Mapa",
                            rota: "/mapa"
                        },
                        {
                            titulo: "Dashboard",
                            rota: "/dashboard"
                        },
                        {
                            titulo: "Consulta",
                            rota: "/consulta"
                        }
                    ]}
                />

                <Submenu
                    icone={<FaBook />}
                    rota="/sobre"
                    titulo="Sobre"
                    itens={[
                        {
                            titulo: "Projeto",
                            rota: "/projeto"
                        },
                        {
                            titulo: "Metodologia",
                            rota: "/metodologia"
                        },
                        {
                            titulo: "Contato",
                            rota: "/contato"
                        }
                    ]}
                />


                <button
                    onClick={exibirModal}
                    title="Suporte"
                    className={estilos.itemConteiner}
                >
                    <FaQuestion />

                    <span className={estilos.tooltip}>
                        Suporte
                    </span>
                </button>


                <Link
                    to="/configuracao"
                    title="Configuração"
                    className={`${estilos.itemConteiner} ${
                        location.pathname === "/configuracao"
                            ? estilos.ativo
                            : ""
                    }`}
                >
                    <IoIosSettings />

                    <span className={estilos.tooltip}>
                        Configuração
                    </span>
                </Link>

            </nav>


            <Suporte
                exibir={modalAberto}
                ocultar={ocultarModal}
            />

        </aside>
    )
}