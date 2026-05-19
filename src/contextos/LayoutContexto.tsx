import { createContext, useState } from 'react'
import { type ReactNode } from 'react';

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
