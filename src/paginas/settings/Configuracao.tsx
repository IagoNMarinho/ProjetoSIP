import estilos from './Configuracao.module.css'

import { Link, useLocation } from 'react-router-dom'

import { CgProfile } from "react-icons/cg"
import { FaPaintBrush } from "react-icons/fa"
import { GrConfigure } from "react-icons/gr"

import { ConfigPerfil } from './ConfigPerfil'

    export function Configuracao(){
        
    const location = useLocation()

        return(
            <section className={estilos.configuracao}>
                <nav className={estilos.secoes}>
                            <Link
                                to="/home"
                                className={`${estilos.itemConteiner} ${location.pathname === "/configuracao" ? estilos.ativo : ""}`}
                            >
                                <CgProfile />
                                <span>
                                    Perfil
                                </span>

                            </Link>
                            
                            <Link
                                to="/home"
                                className={`${estilos.itemConteiner} ${location.pathname === "/home" ? estilos.ativo : ""}`}
                            >
                                <FaPaintBrush />
                                <span>
                                    Preferências
                                </span>

                            </Link>
                            
                            <Link
                                to="/home"
                                className={`${estilos.itemConteiner} ${location.pathname === "/home" ? estilos.ativo : ""}`}
                            >
                                <GrConfigure />
                                <span>
                                    Sistema
                                </span>

                            </Link>
                </nav>
                <div className={estilos.conteiner}>
                    <ConfigPerfil />
                </div>
            </section>
        )
    }