import estilos from './ConfigPerfil.module.css'

import { useContext } from 'react'
import { UsuarioContexto } from '../../contextos/UsuarioContexto'

    export function ConfigPerfil(){

        const { usuarioGoogle } = useContext( UsuarioContexto )

        return(
            <main className={estilos.conteiner}>
                <section className={estilos.intro}>
                    <h2>Configuração de perfil</h2>
                    <p className={estilos.descricao}>
                        Altere ou visualize as informações de seu perfil na plataforma SIP!
                    </p>
                </section>
                <section className={estilos.conta}>
                    <figure>
                        <img
                            className={estilos.foto}
                            src={usuarioGoogle?.picture} 
                            alt="foto do usuário" />
                    </figure>
                    <div className={estilos.infos}>
                        <h2> {usuarioGoogle?.name}</h2>
                        <h2> {usuarioGoogle?.email}</h2>
                    </div>
                </section>
            </main>
        )
    }