import estilos from './MenuSuperior.module.css'

import { FaMagnifyingGlass } from 'react-icons/fa6'

import { useEffect, useState } from 'react'

import { autenticacao, bancoDados } from '../firebase/FirebaseConexao'
import { doc, getDoc } from 'firebase/firestore'

export function MenuSuperior() {

    const [nomeUsuario, setNomeUsuario] = useState('Usuário')

    const [dataAtual, setDataAtual] = useState('')

    useEffect(() => {

        async function carregarNomeUsuario() {

            const usuarioLogado = autenticacao.currentUser

            if (!usuarioLogado) {
                return
            }

            if (usuarioLogado.displayName) {
                setNomeUsuario(usuarioLogado.displayName)
            }

            try {

                const documento = await getDoc(
                    doc(
                        bancoDados,
                        'usuarios',
                        usuarioLogado.uid
                    )
                )

                if (documento.exists()) {

                    const dados = documento.data()

                    if (dados.nome) {
                        setNomeUsuario(dados.nome)
                    }

                }

            } catch (erro) {

                console.error(
                    'Erro ao carregar nome do usuário:',
                    erro
                )

            }
        }

        carregarNomeUsuario()

    }, [])


    useEffect(() => {

        const hoje = new Date()

        const dataFormatada = hoje.toLocaleDateString(
            'pt-BR',
            {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            }
        )

        setDataAtual(dataFormatada)

    }, [])


    return (

        <header className={estilos.conteiner}>

            <div className={estilos.titulo}>

                <h1>
                    Olá, {nomeUsuario}!
                </h1>

                <h5>
                    {dataAtual}
                </h5>

            </div>

            <div className={estilos.pesquisa}>

                <FaMagnifyingGlass />

                <input
                    type="text"
                    placeholder="Pesquisar..."
                />

            </div>

        </header>

    )

}