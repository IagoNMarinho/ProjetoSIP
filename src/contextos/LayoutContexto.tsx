/*Esse arquivo cria um contexto global usando a Context API do React, guardando
apenas informações de interface (UI) compartilhadas entre componentes, como o
estado do menu. Dados do usuário logado agora ficam no AutenticacaoContexto.*/

import { createContext, useState } from 'react'
import { type ReactNode } from 'react'

interface LayoutProviderProps {
  children: ReactNode
}

interface LayoutTipoContexto {
  menuAbertoContexto: boolean
  setMenuAbertoContexto: (menu: boolean) => void
}

export const LayoutContexto = createContext<LayoutTipoContexto>({
  menuAbertoContexto: false,
  setMenuAbertoContexto: () => {}
})

export const LayoutProvider = ({ children }: LayoutProviderProps) => {

  const [menuAbertoContexto, setMenuAbertoContexto] = useState(false)

  return (
    <LayoutContexto.Provider value={{ menuAbertoContexto, setMenuAbertoContexto }}>
      {children}
    </LayoutContexto.Provider>
  )
}