import estilos from './Menu.module.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutContexto } from '../contextos/LayoutContexto'

import { FaHome } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { FaMapMarked } from "react-icons/fa"
import { IoIosStats } from "react-icons/io"
import { FaBook } from "react-icons/fa"
import { TiThMenu } from "react-icons/ti"
import { CgProfile } from "react-icons/cg"
import { FaGlassWaterDroplet } from "react-icons/fa6"

export function Menu() {

    const {
        menuAbertoContexto,
        setMenuAbertoContexto
    } = useContext(LayoutContexto)

    const controlarMenu = () =>
        setMenuAbertoContexto(
            !menuAbertoContexto
        )

    return (
        <aside
            className={estilos.conteiner}
            style={{
                width:
                    menuAbertoContexto
                        ? '240px'
                        : '80px'
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
                    className={estilos.itemConteiner}
                    to="/home"
                >
                    <span><FaHome /></span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Home
                        </span>
                    )}
                </Link>

                <Link
                    className={estilos.itemConteiner}
                    to="/detectar"
                >
                    <span><FaMagnifyingGlass /></span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Detectar
                        </span>
                    )}
                </Link>
                 <Link
                    className={estilos.itemConteiner}
                    to="/gole"
                >
                    <span><FaGlassWaterDroplet /></span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Gole+
                        </span>
                    )}
                </Link>
                    <Link
                    className={estilos.itemConteiner}
                    to="/analises"
                >
                    <span><IoIosStats /></span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Analises
                        </span>
                    )}
                </Link>
                   <Link
                    className={estilos.itemConteiner}
                    to="/sobre"
                >
                    <span><FaBook /></span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Sobre
                        </span>
                    )}
                </Link>
                <Link
                    className={estilos.itemConteiner}
                    to="/perfil"
                >
                    <span><CgProfile /></span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Perfil
                        </span>
                    )}
                </Link>

            </nav>
        </aside>
    )
}