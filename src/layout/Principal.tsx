import estilos from './Principal.module.css'
import { Outlet } from 'react-router-dom'

import { Menu } from './Menu'
import { Rodape } from './Rodape'
import { MenuDireita } from './MenuDireita'
import { MenuSuperior } from './MenuSuperior'

export function Principal() {

    return (
        <div className={estilos.gridConteiner}>

            <Menu />

            <main className={estilos.conteudo}>

                <MenuSuperior />

                <section className={estilos.areaConteudo}>
                    <Outlet />
                </section>

                <Rodape />

            </main>

            <MenuDireita />

        </div>
    )
}