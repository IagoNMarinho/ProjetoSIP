import estilos from './Menu.module.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutContexto } from '../contextos/LayoutContexto'

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
                ☰
            </button>

            <nav>

                <Link
                    className={estilos.itemConteiner}
                    to="/home"
                >
                    <span>🏠</span>

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
                    <span>🔍</span>

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
                    to="/mapa"
                >
                    <span>🗺️</span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Mapa
                        </span>
                    )}
                </Link>
                    <Link
                    className={estilos.itemConteiner}
                    to="/analises"
                >
                    <span>🧭</span>

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
                    to="/metodo"
                >
                    <span>🌐</span>

                    {menuAbertoContexto && (
                        <span
                            className={estilos.rotulo}
                        >
                            Metodologia
                        </span>
                    )}
                </Link>

            </nav>
        </aside>
    )
}