/*Esse arquivo cria um contexto global usando a Context API do React, onde são armazenadas informações que 
podem ser compartilhadas entre diferentes componentes do projeto. Assim, componentes que estiverem dentro do 
Provider conseguem acessar e alterar esses dados sem precisar passar informações manualmente por propriedades.*/

import { createContext, useState } from 'react'
import { type ReactNode } from 'react'

interface LayoutProviderProps {
  children: ReactNode
}

interface LayoutTipoContexto {
  menuAbertoContexto: boolean
  emailUsuarioContexto: string
  setMenuAbertoContexto: (menu: boolean) => void
  setEmailUsuarioContexto: (email: string) => void
}

export const LayoutContexto = createContext<LayoutTipoContexto>({
  menuAbertoContexto: false,
  emailUsuarioContexto: "",
  setMenuAbertoContexto: () => {},
  setEmailUsuarioContexto: () => {}
})

export const LayoutProvider = ({children}: LayoutProviderProps) => {

  const [menuAbertoContexto, setMenuAbertoContexto] = useState(false)
  const [emailUsuarioContexto, setEmailUsuarioContexto] = useState('')

  return (
    <LayoutContexto.Provider value={{ menuAbertoContexto, 
                                      setMenuAbertoContexto,
                                      emailUsuarioContexto,
                                      setEmailUsuarioContexto }}>
      {children}
    </LayoutContexto.Provider>
  )
}
