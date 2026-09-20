import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginUsuario } from '../paginas/LoginUsuario'
import { CadastroUsuario } from '../paginas/CadastroUsuario'
import { Home } from '../paginas/Home'
import { Detectar } from '../paginas/Detectar';
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
import { Amigos } from '../paginas/Amigos'
import { RotaProtegida } from './RotaProtegida'

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
                        element={<RotaProtegida><Home /></RotaProtegida>}
                    />

                    <Route
                        path="detectar"
                        element={<RotaProtegida><Detectar /></RotaProtegida>}
                    />
                      <Route
                        path="analises"
                        element={<RotaProtegida><Analises /></RotaProtegida>}
                    />
                     <Route
                        path="sobre"
                        element={<RotaProtegida><Sobre /></RotaProtegida>}
                    />
                    <Route
                        path="perfil"
                        element={<RotaProtegida><Perfil /></RotaProtegida>}
                    />
                      <Route
                        path="sensorsip"
                        element={<RotaProtegida><Sensorsip /></RotaProtegida>}
                    />
                      <Route
                        path="addreservatorio"
                        element={<RotaProtegida><Addreservatorio /></RotaProtegida>}
                    />
                     <Route
                        path="mapa"
                        element={<RotaProtegida><Mapa /></RotaProtegida>}
                    />
                    <Route
                        path="dashboard"
                        element={<RotaProtegida><Dashboard /></RotaProtegida>}
                    />
                     <Route
                        path="consulta"
                        element={<RotaProtegida><Consulta /></RotaProtegida>}
                    />
                     <Route
                        path="projeto"
                        element={<RotaProtegida><Projeto /></RotaProtegida>}
                    />
                     <Route
                        path="metodologia"
                        element={<RotaProtegida><Metodologia /></RotaProtegida>}
                    />
                     <Route
                        path="contato"
                        element={<RotaProtegida><Contato /></RotaProtegida>}
                    />
                      <Route
                        path="configuracao"
                        element={<RotaProtegida><Configuracao /></RotaProtegida>}
                    />
                      <Route
                        path="preferencias"
                        element={<RotaProtegida><Preferencias /></RotaProtegida>}
                    />
                      <Route
                        path="sistema"
                        element={<RotaProtegida><Sistema /></RotaProtegida>}
                    />
                    <Route
                        path="amigos"
                        element={<RotaProtegida><Amigos /></RotaProtegida>}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}