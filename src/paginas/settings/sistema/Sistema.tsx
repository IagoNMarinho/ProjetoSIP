import estilos from './Sistema.module.css'

import { Link, useLocation } from 'react-router-dom'

import { CgProfile } from "react-icons/cg"
import { FaPaintBrush } from "react-icons/fa"
import { GrConfigure } from "react-icons/gr"

import { ConfSistema } from './ConfSistema'

    export function Sistema(){
        
    const location = useLocation()

        return(
            <section className={estilos.configuracao}>
                <nav className={estilos.secoes}>
                            <Link
                                to="/configuracao"
                                className={`${estilos.itemConteiner} ${location.pathname === "/configuracao" ? estilos.ativo : ""}`}
                            >
                                <CgProfile />
                                <span>
                                    Perfil
                                </span>

                            </Link>
                            
                            <Link
                                to="/preferencias"
                                className={`${estilos.itemConteiner} ${location.pathname === "/preferencias" ? estilos.ativo : ""}`}
                            >
                                <FaPaintBrush />
                                <span>
                                    Preferências
                                </span>

                            </Link>
                            
                            <Link
                                to="/sistema"
                                className={`${estilos.itemConteiner} ${location.pathname === "/sistema" ? estilos.ativo : ""}`}
                            >
                                <GrConfigure />
                                <span>
                                    Sistema
                                </span>

                            </Link>
                </nav>
                <div className={estilos.conteiner}>
                    <ConfSistema />
                </div>
            </section>
        )
    }