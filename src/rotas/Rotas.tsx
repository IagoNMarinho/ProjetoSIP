import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login } from '../paginas/Login'
import { Cadastro } from '../paginas/Cadastro'
import { Home } from '../paginas/Home'
import { Detectar } from '../paginas/Detectar'
import { Mapa } from '../paginas/Mapa'
import { Analises } from '../paginas/Analises'
import { Sobre } from '../paginas/Sobre'
import { Principal } from '../layout/Principal'


export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/cadastro"
                    element={<Cadastro />}
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