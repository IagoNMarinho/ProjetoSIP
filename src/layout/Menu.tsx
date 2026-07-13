import estilos from './Menu.module.css'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutContexto } from '../contextos/LayoutContexto'

import { FaHome } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoIosStats } from "react-icons/io"
import { FaBook } from "react-icons/fa"
import { TiThMenu } from "react-icons/ti"
import { CgProfile } from "react-icons/cg"
import { FaGlassWaterDroplet } from "react-icons/fa6"

export function Menu(){

    const{
        menuAbertoContexto,
        setMenuAbertoContexto
    } = useContext(LayoutContexto)

    const location = useLocation()

    const controlarMenu = () =>{
        setMenuAbertoContexto(!menuAbertoContexto)
    }

    return(

        <aside
            className={estilos.conteiner}
            style={{
                width:menuAbertoContexto ? "240px":"80px"
            }}
        >

            <button
                className={estilos.botaoMenu}
                onClick={controlarMenu}
            >
                <TiThMenu/>
            </button>

            <nav>

                <Link
                    to="/home"
                    className={`${estilos.itemConteiner} ${location.pathname==="/home" ? estilos.ativo:""}`}
                >
                    <FaHome/>

                    {menuAbertoContexto && <span className={estilos.rotulo}>Home</span>}
                </Link>

                <Link
                    to="/detectar"
                    className={`${estilos.itemConteiner} ${location.pathname==="/detectar" ? estilos.ativo:""}`}
                >
                    <FaMagnifyingGlass/>

                    {menuAbertoContexto && <span className={estilos.rotulo}>Detectar</span>}
                </Link>

                <Link
                    to="/gole"
                    className={`${estilos.itemConteiner} ${location.pathname==="/gole" ? estilos.ativo:""}`}
                >
                    <FaGlassWaterDroplet/>

                    {menuAbertoContexto && <span className={estilos.rotulo}>Gole+</span>}
                </Link>

                <Link
                    to="/analises"
                    className={`${estilos.itemConteiner} ${location.pathname==="/analises" ? estilos.ativo:""}`}
                >
                    <IoIosStats/>

                    {menuAbertoContexto && <span className={estilos.rotulo}>Análises</span>}
                </Link>

                <Link
                    to="/sobre"
                    className={`${estilos.itemConteiner} ${location.pathname==="/sobre" ? estilos.ativo:""}`}
                >
                    <FaBook/>

                    {menuAbertoContexto && <span className={estilos.rotulo}>Sobre</span>}
                </Link>

                <Link
                    to="/perfil"
                    className={`${estilos.itemConteiner} ${location.pathname==="/perfil" ? estilos.ativo:""}`}
                >
                    <CgProfile/>

                    {menuAbertoContexto && <span className={estilos.rotulo}>Perfil</span>}
                </Link>

            </nav>

        </aside>

    )

}