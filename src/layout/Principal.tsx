import estilos from './Principal.module.css'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { Menu } from './Menu'
import { Footer } from './footer'
import { LayoutContexto } from '../contextos/LayoutContexto'

export function Principal() {

    const { menuAbertoContexto } =
        useContext(LayoutContexto)

    return (
        <div
            className={estilos.gridConteiner}
            style={{
                gridTemplateColumns:
                    menuAbertoContexto
                        ? '240px 1fr'
                        : '80px 1fr'
            }}
        >
            <Menu />

            <main className={estilos.conteudo}>
                <Outlet />
               
            </main>


        </div>
    )
}