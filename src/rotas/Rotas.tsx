import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginUsuario } from '../paginas/LoginUsuario'
import { CadastroUsuario } from '../paginas/CadastroUsuario'
import { Home } from '../paginas/Home'
import { Detectar } from '../paginas/Detectar'
import { Gole } from '../paginas/Gole'
import { Analises } from '../paginas/Analises'
import { Sobre } from '../paginas/Sobre'
import { Perfil } from  '../paginas/Perfil'
import { Principal } from '../layout/Principal'
import { CadastroInstituicao } from '../paginas/CadastroInstituicao'
import { Sensorsip } from '../paginas/Sensorsip'
import { Addreservatorio } from '../paginas/Addreservatorio'
import { Mapa } from '../paginas/Mapa'
import { Dashboard } from '../paginas/Dashboard'
import { Consulta } from '../paginas/Consulta'
import { Projeto } from '../paginas/Projeto'
import { Metodologia } from '../paginas/Metodologia'
import { Contato } from '../paginas/Contato'
import { Configuracao } from '../paginas/settings/perfil/Configuracao'
import { Preferencias } from '../paginas/settings/preferencias/Preferencias'
import { Sistema } from '../paginas/settings/sistema/Sistema'



export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>

                <Route 
                    path="/" 
                    element={<LoginUsuario/>} 
                />

                <Route
                    path="/cadastro"
                    element={<CadastroUsuario />}
                />
                
                <Route
                    path="/cadastroinstituicao"
                    element={<CadastroInstituicao />}
                />

                <Route
                    path="/"
                    element={<Principal />}
                >
                    <Route
                        path="home"
                        element={<Home />}
                    />

                    <Route
                        path="detectar"
                        element={<Detectar />}
                    />

                     <Route
                        path="gole"
                        element={<Gole />}
                    />
                      <Route
                        path="analises"
                        element={<Analises />}
                    />
                     <Route
                        path="sobre"
                        element={<Sobre />}
                    />
                    <Route
                        path="perfil"
                        element={<Perfil />}
                    />
                      <Route
                        path="sensorsip"
                        element={<Sensorsip />}
                    />
                      <Route
                        path="addreservatorio"
                        element={<Addreservatorio />}
                    />
                     <Route
                        path="mapa"
                        element={<Mapa />}
                    />
                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="mapa"
                        element={<Mapa />}
                    />
                     <Route
                        path="consulta"
                        element={<Consulta />}
                    />
                     <Route
                        path="projeto"
                        element={<Projeto />}
                    />
                     <Route
                        path="metodologia"
                        element={<Metodologia />}
                    />
                     <Route
                        path="contato"
                        element={<Contato />}
                    />
                      <Route
                        path="configuracao"
                        element={<Configuracao />}
                    />
                      <Route
                        path="preferencias"
                        element={<Preferencias />}
                    />
                      <Route
                        path="sistema"
                        element={<Sistema />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}