/*
    Context API responsável por guardar os dados do usuário logado
    (vindos do Firebase Authentication + Cloud Firestore) e disponibilizá-los
    para qualquer componente da aplicação via useContext(), sem precisar
    passar informações manualmente entre páginas.

    Esse Context é a ÚNICA fonte de verdade sobre "quem está logado" no app -
    tanto para login por e-mail/senha quanto para login via Google, já que
    ambos os fluxos terminam em uma sessão do Firebase Authentication.

    Ele usa onAuthStateChanged para "escutar" o estado de autenticação do
    Firebase. Esse listener dispara automaticamente assim que o app carrega,
    inclusive depois de um F5 - porque o Firebase mantém a sessão salva no
    navegador de forma independente do estado do React. Por isso os dados do
    usuário não somem mais ao recarregar a página.
*/

import { createContext, useState, useEffect, type ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { autenticacao, bancoDados } from '../firebase/FirebaseConexao'

// Formato dos dados do usuário logado (Firebase Auth + Firestore combinados)
export interface DadosUsuario {
    uid: string
    email: string
    tipo: 'usuario' | 'instituicao'
    nome?: string
    telefone?: string
    cpf?: string
    dataNas?: string
    cnpj?: string
    codigo?: string
    picture?: string
    [chave: string]: unknown
}

interface AutenticacaoContextoType {
    usuarioContexto: DadosUsuario | null
    carregandoAutenticacaoContexto: boolean
    setUsuarioContexto: (usuario: DadosUsuario | null) => void
    atualizarUsuarioContexto: (uid: string) => Promise<void>
}

export const AutenticacaoContexto = createContext<AutenticacaoContextoType>({
    usuarioContexto: null,
    carregandoAutenticacaoContexto: true,
    setUsuarioContexto: () => {},
    atualizarUsuarioContexto: async () => {}
})

export function AutenticacaoProvider({ children }: { children: ReactNode }) {

    const [usuarioContexto, setUsuarioContexto] = useState<DadosUsuario | null>(null)

    // Indica se ainda está verificando a sessão salva no carregamento inicial.
    // Evita mostrar telas de "deslogado" por engano antes da resposta chegar.
    const [carregandoAutenticacaoContexto, setCarregandoAutenticacaoContexto] = useState(true)

    // Busca no Firestore os dados completos do usuário logado (testando as
    // duas coleções possíveis) e atualiza o Context. Pode ser chamada tanto
    // automaticamente pelo listener quanto manualmente logo após um
    // login/cadastro, para o Context refletir os dados na hora.
    const atualizarUsuarioContexto = async (uid: string) => {
        let documento = await getDoc(doc(bancoDados, 'usuarios', uid))
        let tipo: 'usuario' | 'instituicao' = 'usuario'

        if (!documento.exists()) {
            documento = await getDoc(doc(bancoDados, 'instituicoes', uid))
            tipo = 'instituicao'
        }

        if (documento.exists()) {
            setUsuarioContexto({
                uid,
                email: autenticacao.currentUser?.email ?? '',
                tipo,
                picture: autenticacao.currentUser?.photoURL ?? undefined,
                ...documento.data()
            })
        } else {
            // Sessão existe no Firebase Authentication,
            // mas não existe um cadastro correspondente no Firestore.
            setUsuarioContexto(null)
        }
    }

    useEffect(() => {
        const cancelarListener = onAuthStateChanged(autenticacao, async (usuarioFirebase) => {
            if (usuarioFirebase) {
                await atualizarUsuarioContexto(usuarioFirebase.uid)
            } else {
                setUsuarioContexto(null)
            }
            setCarregandoAutenticacaoContexto(false)
        })

        // Cancela o listener ao desmontar, evitando memory leak
        return () => cancelarListener()
    }, [])

    return (
        <AutenticacaoContexto.Provider value={{
            usuarioContexto,
            setUsuarioContexto,
            carregandoAutenticacaoContexto,
            atualizarUsuarioContexto
        }}>
            {children}
        </AutenticacaoContexto.Provider>
    )
}