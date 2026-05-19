import { Rotas } from './rotas/Rotas'
import { LayoutProvider } from './contextos/LayoutContexto'

function App(){
    return (
        <LayoutProvider>
          <Rotas />
        </LayoutProvider>
  )
}

export default App