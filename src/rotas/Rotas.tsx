import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Cadastro } from '../paginas/Cadastro'

export function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='cadastro' element={ <Cadastro />} />
            </Routes>
        </BrowserRouter>
    )
}