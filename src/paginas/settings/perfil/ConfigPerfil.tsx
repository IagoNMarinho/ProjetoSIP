import estilos from "./ConfigPerfil.module.css";

import semfoto from "../../../assets/imagens/perfil.png";

import { useState, useContext, useRef, useEffect } from "react";
import { AutenticacaoContexto } from "../../../contextos/AutenticacaoContexto";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../../hooks/useAutenticacao";

import { autenticacao, bancoDados} from "../../../firebase/FirebaseConexao";
import { doc, updateDoc } from "firebase/firestore";

import { Confirmar } from "../../../componentes/SUPORTE/Confirmar";

import { CiEdit } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { TiUserDelete } from "react-icons/ti";
import { MdSupervisorAccount } from "react-icons/md";

export function ConfigPerfil() {
  const usuarioLogado = autenticacao.currentUser;

  // Os dados do usuário já vêm prontos do AutenticacaoContexto -
  // não precisamos mais buscar no Firestore aqui dentro, o Context
  // já faz isso automaticamente (inclusive depois de um F5).
  const { usuarioContexto, atualizarUsuarioContexto } =
    useContext(AutenticacaoContexto);

  const [editando, setEditando] = useState(false); //controla se os campos podem ser editados

  // Estados locais dos campos do formulário, inicializados a partir do Context.
  // Como usuarioContexto pode demorar um instante para carregar (após F5),
  // usamos um useEffect para preencher os campos assim que ele estiver disponível.
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNas, setdataNas] = useState("");

  // Preview local da foto (antes de ser salva/enviada de verdade).
  // Não fica mais no Context, já que é um estado temporário de edição,
  // não um dado persistido do usuário.
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioContexto) return;

    setNome(usuarioContexto.nome ?? "");
    setTelefone(usuarioContexto.telefone ?? "");
    setCpf(usuarioContexto.cpf ?? "");
    setEmail(usuarioContexto.email ?? "");
    setdataNas(usuarioContexto.dataNas ?? "");
  }, [usuarioContexto]);

  const { deslogar } = useAutenticacao();

  async function salvarDados() {
    if (!usuarioLogado) {
      console.log("Nenhum usuário está logado.");
      return;
    }
    const uid = usuarioLogado.uid;

    await updateDoc(doc(bancoDados, "usuarios", uid), {
      nome: nome,
      telefone: telefone,
      cpf: cpf,
      dataNas: dataNas,
    });

    // Atualiza o Context com os dados recém-salvos, para refletir
    // a mudança imediatamente em qualquer outro lugar do app que
    // exiba esses dados (ex: header, saudação, etc.)
    await atualizarUsuarioContexto(uid);

    setEditando(false); //bloqueia novamente os campos para edição
  }

  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false);
  const [modalMensagemTexto, setMensagemTexto] = useState("");
  const [modalMensagemTitulo, setMensagemTitulo] = useState("");
  const [acaoConfirmar, setAcaoConfirmar] = useState<() => void>(
    () => () => {},
  );

  function abrirConfirmacao(titulo: string, texto: string, acao: () => void) {
    setMensagemTitulo(titulo); //define o título do modal
    setMensagemTexto(texto); //define a mensagem exibida
    setModalMensagemVisivel(true); //abre o modal
    setAcaoConfirmar(() => acao); //guarda a ação que será executada ao confirmar
  }

  function fecharConfirmacao() {
    setModalMensagemVisivel(false);
  }

  const navegacao = useNavigate();
  const sairDaConta = async () => {
    await deslogar();
    navegacao("/");
  };
  const login = () => {
    navegacao("/");
  };

  const inputFoto = useRef<HTMLInputElement>(null); //referência ao input de seleção de arquivos
  function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]; //obtém o primeiro arquivo selecionado

    if (!arquivo) return; //encerra a função caso nenhum arquivo tenha sido escolhido
    const url = URL.createObjectURL(arquivo); //cria uma URL temporária para exibir a imagem
    setFotoPreview(url);

    // Nota: isso só troca a foto visualmente (preview local).
    // Para persistir de verdade, seria necessário enviar o arquivo para o
    // Firebase Storage e depois atualizar o "photoURL" do usuário -
    // isso ainda não está implementado aqui.
  }

  return (
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
            src={fotoPreview || autenticacao.currentUser?.photoURL || semfoto}
            alt="foto do usuário"
          />

          <button onClick={() => inputFoto.current?.click()}>
            <CiEdit />
          </button>

          <input
            ref={inputFoto} //permite acessar o input pelo botão
            type="file" //aceita seleção de arquivos
            accept="image/*" //permite apenas imagens
            onChange={trocarFoto} //executa a troca da foto após a seleção
            style={{ display: "none" }} //esconde o input do usuário
          />
        </div>

        <div className={estilos.formulario}>
          <div className={estilos.campo}>
            <label>Nome:</label>
            <input
              className={estilos.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              readOnly={!editando}
            />
          </div>

          <div className={estilos.campo}>
            <label>Email:</label>
            <input
              className={estilos.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editando}
            />
          </div>

          <div className={estilos.campo}>
            <label>Telefone:</label>
            <input
              className={estilos.input}
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              readOnly={!editando}
            />
          </div>

          <div className={estilos.linha}>
            <div className={estilos.campo}>
              <label>CPF:</label>
              <input
                className={estilos.input}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                readOnly={!editando}
              />
            </div>

            <div className={estilos.campo}>
              <label>Data de nascimento:</label>
              <input
                className={estilos.input}
                type="date"
                value={dataNas}
                onChange={(e) => setdataNas(e.target.value)}
                readOnly={!editando}
              />
            </div>
          </div>

          <div className={estilos.botoes}>
            <button className={estilos.botao} onClick={() => setEditando(true)}>
              Fazer alterações
            </button>
            <button className={estilos.botao} onClick={salvarDados}>
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
                "Sair da conta",
                "Tem certeza que deseja sair da sua conta?",
                () => {
                  sairDaConta();
                },
              )
            }
          >
            <CiLogout />
            Sair da conta
          </button>
          <button
            className={estilos.botao}
            onClick={() =>
              abrirConfirmacao(
                "Excluir conta",
                "Esta ação é permanente. Deseja realmente excluir sua conta?",
                () => {
                  login();
                },
              )
            }
          >
            <TiUserDelete />
            Excluir conta
          </button>
          <button
            className={estilos.botao}
            onClick={() =>
              abrirConfirmacao(
                "Trocar conta",
                "Deseja sair da conta atual para entrar com outra?",
                () => {
                  login();
                },
              )
            }
          >
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
  );
}
