import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from '../paginas/Login'

export function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}