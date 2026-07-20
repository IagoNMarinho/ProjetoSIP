import estilos from './ConfigPerfil.module.css'

import perfil from '../../assets/imagens/perfil.png'

import { useState, useContext } from 'react'
import { UsuarioContexto } from '../../contextos/UsuarioContexto'
import { useNavigate } from 'react-router-dom'

import { Confirmar } from '../../componentes/SUPORTE/Confirmar'

import { CiEdit } from "react-icons/ci"
import { CiLogout } from "react-icons/ci"
import { TiUserDelete } from "react-icons/ti"
import { MdSupervisorAccount } from "react-icons/md"

    export function ConfigPerfil(){

        const { usuarioGoogle, setUsuarioGoogle } = useContext( UsuarioContexto )

        const [editando, setEditando] = useState(false)
        const [nome, setNome] = useState(usuarioGoogle?.name || "")
        const [email, setEmail] = useState(usuarioGoogle?.email || "")
        const [telefone, setTelefone] = useState("")
        const [cpf, setCpf] = useState("")
        const [dataNas, setdataNas] = useState("")

        function salvarDados(){
            setUsuarioGoogle({
                ...usuarioGoogle!,
                name: nome,
                email: email
            });
        setEditando(false);
        }
            
        const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
        const [modalMensagemTexto, setMensagemTexto] = useState("")
        const [modalMensagemTitulo, setMensagemTitulo] = useState("")
        const [acaoConfirmar, setAcaoConfirmar] = useState<() => void>(() => () => {})

        function abrirConfirmacao(titulo: string, texto: string, acao: () => void) {
            setMensagemTitulo(titulo)
            setMensagemTexto(texto)
            setModalMensagemVisivel(true)
            setAcaoConfirmar(() => acao)
        }

        function fecharConfirmacao() {
            setModalMensagemVisivel(false)
        }

        const navegacao = useNavigate()
        
        const login = () =>{
            navegacao('/')
        }

        return(
            <main className={estilos.conteiner}>

                <section className={estilos.intro}>
                    <h2 className={estilos.titulo}>Configuração de perfil</h2>
                    <p>
                        Altere ou visualize as informações de seu perfil na plataforma SIP!
                    </p>
                </section>

                <section className={estilos.conta}>
                    
                    <div className={estilos.fotoArea}>
                        <img
                            className={estilos.foto}
                            src={usuarioGoogle?.picture || perfil} 
                            alt="foto do usuário" />
                        <button><CiEdit /></button>
                    </div>

                    <div className={estilos.formulario}>

                        <div className={estilos.campo}>
                            <label>Nome:</label>
                            <input
                                className={estilos.input}
                                value={nome}
                                onChange={(e)=>setNome(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        <div className={estilos.campo}>
                            <label>Email:</label>
                            <input
                                className={estilos.input}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        <div className={estilos.campo}>
                            <label>Telefone:</label>
                            <input
                                className={estilos.input}
                                value={telefone}
                                onChange={(e)=>setTelefone(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        <div className={estilos.linha}>
                            <div className={estilos.campo}>
                                <label>CPF:</label>
                                <input
                                    className={estilos.input}
                                    value={cpf}
                                    onChange={(e)=>setCpf(e.target.value)}
                                    readOnly={!editando}
                                />
                            </div>

                            <div className={estilos.campo}>
                                <label>Data de nascimento:</label>
                                <input
                                    className={estilos.input}
                                    type='date'
                                    value={dataNas}
                                    onChange={(e)=>setdataNas(e.target.value)}
                                    readOnly={!editando}
                                />
                            </div>
                        </div>

                        <div className={estilos.botoes}>
                            <button
                                className={estilos.botao} 
                                onClick={() => setEditando(true)}>
                                Fazer alterações
                            </button>
                            <button
                                className={estilos.botao} 
                                onClick={salvarDados}>
                                Salvar dados
                            </button>
                        </div>

                    </div>
                    
                </section>

                
                <section className={estilos.conta}>
                    
                    <div className={estilos.fotoArea}>
                        <img
                            className={estilos.foto}
                            src={usuarioGoogle?.picture || perfil} 
                            alt="foto do usuário" />
                        <button><CiEdit /></button>
                    </div>

                    <div className={estilos.formulario}>

                        <div className={estilos.campo}>
                            <label>Nome instituição:</label>
                            <input
                                className={estilos.input}
                                value={nome}
                                onChange={(e)=>setNome(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        <div className={estilos.campo}>
                            <label>Email:</label>
                            <input
                                className={estilos.input}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        <div className={estilos.campo}>
                            <label>Telefone:</label>
                            <input
                                className={estilos.input}
                                value={telefone}
                                onChange={(e)=>setTelefone(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        
                        <div className={estilos.campo}>
                            <label>CNPJ:</label>
                            <input
                                className={estilos.input}
                                value={cpf}
                                onChange={(e)=>setCpf(e.target.value)}
                                readOnly={!editando}
                            />
                        </div>

                        <div className={estilos.botoes}>
                            <button
                                className={estilos.botao} 
                                onClick={() => setEditando(true)}>
                                Fazer alterações
                            </button>
                            <button
                                className={estilos.botao} 
                                onClick={salvarDados}>
                                Salvar dados
                            </button>
                        </div>

                    </div>
                    
                </section>

                <section className={estilos.sessao}>
                    <h2 className={estilos.titulo}>Sessão</h2>
                    <div className={estilos.botoes2}>
                        <button
                            className={estilos.botao} 
                            onClick={() =>
                                abrirConfirmacao(
                                    'Sair da conta',
                                    'Tem certeza que deseja sair da sua conta?',
                                    () => {
                                        login()
                                    }
                                )
                            }>
                            <CiLogout />
                                Sair da conta
                        </button>
                        <button
                            className={estilos.botao} 
                           onClick={() =>
                                abrirConfirmacao(
                                    'Excluir conta',
                                    'Esta ação é permanente. Deseja realmente excluir sua conta?',
                                    () => {
                                        login()
                                    }
                                )
                            }>
                            <TiUserDelete />
                                Excluir conta
                        </button>
                        <button
                            className={estilos.botao} 
                            onClick={() =>
                                abrirConfirmacao(
                                    'Trocar conta',
                                    'Deseja sair da conta atual para entrar com outra?',
                                    () => {
                                        login()
                                    }
                                )
                            }>
                            <MdSupervisorAccount />
                                Trocar conta
                        </button>
                    </div>
                </section>

                <Confirmar
                    exibir={modalMensagemVisivel}
                    ocultar={fecharConfirmacao}
                    titulo={modalMensagemTitulo}
                    texto={modalMensagemTexto}
                    aoConfirmar={acaoConfirmar}
                />
            </main>
        )
    }