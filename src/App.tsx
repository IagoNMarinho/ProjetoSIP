import { Rotas } from './rotas/Rotas'
import { LayoutProvider } from './contextos/LayoutContexto'
import { UsuarioProvider } from './contextos/UsuarioContexto'

function App(){
    return (
        <LayoutProvider>
          <UsuarioProvider>
            <Rotas />
          </UsuarioProvider>
        </LayoutProvider>
  )
}

export default App