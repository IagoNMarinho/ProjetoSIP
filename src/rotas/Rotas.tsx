import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginUsuario } from '../paginas/login/LoginUsuario'
import { CadastroUsuario } from '../paginas/cadastros/usuario/CadastroUsuario'
import { Home } from '../paginas/home/Home'
import { Detectar } from '../paginas/detectar/Detectar';
import { Analises } from '../paginas/analises/Analises'
import { Sobre } from '../paginas/sobre/Sobre'
import { Perfil } from  '../paginas/perfil/Perfil'
import { Principal } from '../layout/Principal'
import { CadastroInstituicao } from '../paginas/cadastros/instituicao/CadastroInstituicao'
import { Sensorsip } from '../paginas/detectar/sensorsip/Sensorsip'
import { Addreservatorio } from '../paginas/detectar/reservatorios/Addreservatorio'
import { Mapa } from '../paginas/analises/mapa/Mapa'
import { Dashboard } from '../paginas/analises/dashboard/Dashboard'
import { Consulta } from '../paginas/analises/consulta/Consulta'
import { Projeto } from '../paginas/sobre/projeto/Projeto'
import { Metodologia } from '../paginas/sobre/metodologia/Metodologia';
import { Contato } from '../paginas/sobre/contato/Contato'
import { Configuracao } from '../paginas/settings/perfil/Configuracao'
import { Preferencias } from '../paginas/settings/preferencias/Preferencias'
import { Sistema } from '../paginas/settings/sistema/Sistema'
import { Amigos } from '../paginas/amigos/Amigos'
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