import estilos from "./Submenu.module.css";
import { useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutContexto } from "../contextos/LayoutContexto";

import { FaChevronRight } from "react-icons/fa";

interface ItemSubmenu {
    titulo: string;
    rota: string;
}

interface SubmenuProps {
    icone: React.ReactNode;
    rota: string;
    titulo: string;
    itens: ItemSubmenu[];
}

export function Submenu({
    icone,
    rota,
    titulo,
    itens
}: SubmenuProps) {

    const { menuAbertoContexto } = useContext(LayoutContexto);

    const location = useLocation();

    const [aberto, setAberto] = useState(false);

    //Cria um atraso para fechar o submenu ao retirar o mouse
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const possuiPaginaAtiva =
        location.pathname === rota ||
        itens.some(item => location.pathname === item.rota);

    function abrirMenu() {

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setAberto(true);
    }

    function fecharMenu() {

        timeoutRef.current = setTimeout(() => {
            setAberto(false);
        }, 180);

    }

    return (

        <div
            className={estilos.conteiner}
            onMouseEnter={abrirMenu}
            onMouseLeave={fecharMenu}
        >

            <Link
                to={rota}
                className={`${estilos.botao} ${possuiPaginaAtiva ? estilos.ativo : ""}`}
            >

                <div className={estilos.esquerda}>

                    {icone}

                    {menuAbertoContexto && (
                        <span>{titulo}</span>
                    )}

                </div>

                {menuAbertoContexto && (
                    <FaChevronRight />
                )}

            </Link>

            {menuAbertoContexto && aberto && (

                <div
                    className={estilos.submenuLista}
                    onMouseEnter={abrirMenu}
                    onMouseLeave={fecharMenu}
                >

                    {itens.map(item => (

                        <Link
                            key={item.rota}
                            to={item.rota}
                            className={
                                location.pathname === item.rota
                                    ? estilos.submenuAtivo
                                    : ""
                            }
                        >
                            {item.titulo}
                        </Link>

                    ))}

                </div>

            )}

            {!menuAbertoContexto && aberto && (

                <div
                    className={estilos.submenuFlutuante}
                    onMouseEnter={abrirMenu}
                    onMouseLeave={fecharMenu}
                >

                    <h4>{titulo}</h4>

                    {itens.map(item => (

                        <Link
                            key={item.rota}
                            to={item.rota}
                            className={
                                location.pathname === item.rota
                                    ? estilos.submenuAtivo
                                    : ""
                            }
                        >
                            {item.titulo}
                        </Link>

                    ))}

                </div>

            )}

        </div>

    );

}