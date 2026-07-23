import estilos from './Menu.module.css'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutContexto } from '../contextos/LayoutContexto'

import { Submenu } from './Submenu'
import { Suporte } from '../componentes/SUPORTE/Suporte'
import { useState } from 'react'

import { FaHome } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoIosStats } from "react-icons/io"
import { FaBook } from "react-icons/fa"
import { TiThMenu } from "react-icons/ti"
import { CgProfile } from "react-icons/cg"
import { FaGlassWaterDroplet } from "react-icons/fa6"
import { IoIosSettings } from "react-icons/io"
import { FaQuestion } from "react-icons/fa"

export function Menu() {

    const {
        menuAbertoContexto,
        setMenuAbertoContexto
    } = useContext(LayoutContexto)

    const location = useLocation()

    function controlarMenu() {
        setMenuAbertoContexto(!menuAbertoContexto)
    }
    
    const [modalAberto, setModalAberto] = useState(false);
    function exibirModal() {
        setModalAberto(true);
    }
    function ocultarModal() {
        setModalAberto(false);
    }

    return (

        <aside
            className={estilos.conteiner}
            style={{
                width: menuAbertoContexto ? "240px" : "80px"
            }}
        >

            <button
                className={estilos.botaoMenu}
                onClick={controlarMenu}
            >
                <TiThMenu />
            </button>

            <nav>

                <Link
                    to="/home"
                    className={`${estilos.itemConteiner} ${location.pathname === "/home" ? estilos.ativo : ""}`}
                >
                    <FaHome />

                    {menuAbertoContexto &&
                        <span className={estilos.rotulo}>
                            Home
                        </span>
                    }

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
                        },
                    ]}
                />

                <Link
                    to="/gole"
                    className={`${estilos.itemConteiner} ${location.pathname === "/gole" ? estilos.ativo : ""}`}
                >
                    <FaGlassWaterDroplet />

                    {menuAbertoContexto &&
                        <span className={estilos.rotulo}>
                            Gole+
                        </span>
                    }

                </Link>


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
                    icone={ <FaBook />}
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

                <Link
                    to="/perfil"
                    className={`${estilos.itemConteiner} ${location.pathname === "/perfil" ? estilos.ativo : ""}`}
                >
                    <CgProfile />

                    {menuAbertoContexto &&
                        <span className={estilos.rotulo}>
                            Perfil
                        </span>
                    }

                </Link>
                    <button 
                        onClick={exibirModal}
                        className={
                        `${estilos.itemConteiner} `}>
                       <FaQuestion />
                        {menuAbertoContexto &&
                        <span className={estilos.rotulo}>
                            Suporte
                        </span>
                    }
                    </button>
                    
                <Submenu
                    icone={ <IoIosSettings />}
                    rota="/configuracao"
                    titulo="Configuração"
                    itens={[
                        {
                            titulo: "Perfil",
                            rota: "/configuracao"
                        },
                        {
                            titulo: "Preferências",
                            rota: "/preferencias"
                        },
                        {
                            titulo: "Sistema",
                            rota: "/sistema"
                        }
                    ]}
                />
            </nav>
                    <Suporte
                            exibir={modalAberto}
                            ocultar={ocultarModal}
                        />
        </aside>

    )

}