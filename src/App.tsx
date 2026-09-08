import { Rotas } from './rotas/Rotas'
import { LayoutProvider } from './contextos/LayoutContexto'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'

function App(){
    return (
        <LayoutProvider>
          <AutenticacaoProvider>
            <Rotas />
          </AutenticacaoProvider>
        </LayoutProvider>
  )
}

export default App