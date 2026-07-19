/*
    Context API cria um espaço compartilhado para armazenar informações do usuário
    logado (nome, e-mail, foto etc.), permitindo que qualquer componente da aplicação
    acesse esses dados usando useContext(), sem precisar passá-los entre páginas.

    O UsuarioProvider guarda essas informações no useState e as disponibiliza através
    do Provider. Quando o login é realizado, basta chamar setUsuarioGoogle(usuario)
    para atualizar os dados em toda a aplicação.
*/

import { createContext, useState, type ReactNode } from "react";
import { type GoogleUser } from '../tipos/GoogleUser';

type UsuarioContextoType = {
    usuarioGoogle: GoogleUser | null;
    setUsuarioGoogle: React.Dispatch<React.SetStateAction<GoogleUser | null>>;
}

export const UsuarioContexto = createContext<UsuarioContextoType>(
    {} as UsuarioContextoType
);

export function UsuarioProvider({ children }: { children: ReactNode }) {

    const [usuarioGoogle, setUsuarioGoogle] = useState<GoogleUser | null>(null);

    return (
        <UsuarioContexto.Provider
            value={{
                usuarioGoogle,
                setUsuarioGoogle
            }}
        >
            {children}
        </UsuarioContexto.Provider>
    );
}