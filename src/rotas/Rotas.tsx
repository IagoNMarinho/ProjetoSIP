import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginUsuario } from '../paginas/LoginUsuario'
import { CadastroUsuario } from '../paginas/CadastroUsuario'
import { Home } from '../paginas/Home'
import { Detectar } from '../paginas/Detectar'
import { Mapa } from '../paginas/Mapa'
import { Analises } from '../paginas/Analises'
import { Sobre } from '../paginas/Sobre'
import { Principal } from '../layout/Principal'
import { CadastroInstituicao } from '../paginas/CadastroInstituicao'


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
                        path="mapa"
                        element={<Mapa />}
                    />
                      <Route
                        path="analises"
                        element={<Analises />}
                    />
                     <Route
                        path="sobre"
                        element={<Sobre />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}