import estilos from './MenuDireita.module.css'

import { CgProfile } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'

export function MenuDireita() {

    const location = useLocation()

    const perfilAtivo = location.pathname === '/perfil'

    return (
        <aside className={estilos.conteiner}>
            
            <Link
                to="/perfil"
                className={`${estilos.perfil} ${
                    perfilAtivo ? estilos.perfilAtivo : ''
                }`}
            >
                <div className={estilos.avatar}>
                    <CgProfile />
                </div>

                <div className={estilos.dadosPerfil}>
                    <h2>Usuário</h2>
                    <span>Perfil</span>
                </div>
            </Link>

        </aside>
    )
}