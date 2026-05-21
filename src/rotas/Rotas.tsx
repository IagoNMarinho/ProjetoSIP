import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Cadastro } from '../paginas/Cadastro'
import { Home } from '../paginas/Home'

export function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='cadastro' element={ <Cadastro />} />

                <Route path='home' element={ <Home />} />

            </Routes>
        </BrowserRouter>
    )
}