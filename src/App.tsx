import { Rotas } from './rotas/Rotas'
import { LayoutProvider } from './contextos/LayoutContexto'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'
import { FirebaseConexao } from './firebase/FirebaseConexao'

function App(){
    return (
        <LayoutProvider>
          <AutenticacaoProvider>
            <FirebaseConexao/>
            <Rotas />
          </AutenticacaoProvider>
        </LayoutProvider>
  )
}

export default App