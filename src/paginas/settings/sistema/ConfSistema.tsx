import estilos from "./ConfSistema.module.css";

import perfil from "../../../assets/imagens/perfil.png";

import { useContext, useState, useRef, useEffect } from "react";
import { AutenticacaoContexto } from "../../../contextos/AutenticacaoContexto";
import { autenticacao, bancoDados } from "../../../firebase/FirebaseConexao";
import { doc, updateDoc } from "firebase/firestore";

import { FaBuilding } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { FaSlidersH } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

export function ConfSistema() {
  const usuarioLogado = autenticacao.currentUser;

  // Os dados da instituição já vêm prontos do AutenticacaoContexto -
  // não precisamos buscar no Firestore aqui dentro, o Context já
  // faz isso automaticamente (inclusive depois de um F5).
  const { usuarioContexto, atualizarUsuarioContexto } =
    useContext(AutenticacaoContexto);

  const [editando, setEditando] = useState(false); //controla se os campos podem ser editados
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");

  // Preview local da foto/logo (antes de ser salva de verdade).
  // Ainda não persiste no Firebase Storage - ver nota em trocarFoto.
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  // Preenche os campos assim que os dados da instituição estiverem
  // disponíveis no Context (acontece automaticamente após login/F5)
  useEffect(() => {
    if (!usuarioContexto) return;

    setNome(usuarioContexto.nome ?? "");
    setEmail(usuarioContexto.email ?? "");
    setTelefone(usuarioContexto.telefone ?? "");
    setCnpj(usuarioContexto.cnpj ?? "");
  }, [usuarioContexto]);

  async function salvarDados() {
    if (!usuarioLogado) {
      console.log("Nenhuma instituição está logada.");
      return;
    }
    const uid = usuarioLogado.uid;

    // Grava as alterações de verdade no Firestore -
    // antes essa função só atualizava o Context, então as
    // mudanças se perdiam a cada F5.
    await updateDoc(doc(bancoDados, "instituicoes", uid), {
      nome: nome,
      email: email,
      telefone: telefone,
      cnpj: cnpj,
    });

    // Atualiza o Context com os dados recém-salvos, refletindo
    // a mudança imediatamente em qualquer outra tela
    await atualizarUsuarioContexto(uid);

    setEditando(false); //bloqueia novamente os campos para edição
  }

  const inputFoto = useRef<HTMLInputElement>(null); //referência ao input de seleção de arquivos
  function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]; //obtém o primeiro arquivo selecionado

    if (!arquivo) return; //encerra a função caso nenhum arquivo tenha sido escolhido
    const url = URL.createObjectURL(arquivo); //cria uma URL temporária para exibir a imagem
    setFotoPreview(url);

    // Nota: isso só troca a imagem visualmente (preview local).
    // Para persistir de verdade, seria necessário enviar o arquivo
    // para o Firebase Storage e depois salvar a URL no Firestore -
    // ainda não implementado aqui.
  }

  return (
    <div className={estilos.configuracoes}>
      <div className={estilos.cabecalho}>
        <h1>Sistema</h1>

        <p>
          Configure as opções de monitoramento, dispositivos, equipe, dados e
          informações da aplicação.
        </p>
      </div>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaBuilding />

          <div>
            <h2>Instituição</h2>

            <p>Gerencie as informações da instituição vinculada à conta.</p>
          </div>
        </div>
        <div className={estilos.instituicao}>
          <div className={estilos.fotoArea}>
            <div className={estilos.fotoContainer}>
              <img
                className={estilos.foto}
                src={
                  fotoPreview || autenticacao.currentUser?.photoURL || perfil
                }
                alt="Logo ou imagem da instituição"
              />
              <button
                className={estilos.botaoFoto}
                onClick={() => inputFoto.current?.click()}
              >
                <CiEdit />
              </button>
            </div>

            <input
              ref={inputFoto}
              type="file"
              accept="image/*"
              onChange={trocarFoto}
              style={{ display: "none" }}
            />
          </div>

          <div className={estilos.formulario}>
            <div className={estilos.campo}>
              <label>Nome da instituição:</label>

              <input
                className={estilos.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                readOnly={!editando}
              />
            </div>

            <div className={estilos.campo}>
              <label>Email institucional:</label>

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

            <div className={estilos.campo}>
              <label>CNPJ:</label>

              <input
                className={estilos.input}
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                readOnly={!editando}
              />
            </div>
            <div className={estilos.botoes}>
              <button
                className={estilos.botao}
                onClick={() => setEditando(true)}
              >
                Fazer alterações
              </button>
              <button className={estilos.botao} onClick={salvarDados}>
                Salvar dados
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <MdNotificationsActive />

          <div>
            <h2>Monitoramento</h2>
            <p>Configure o acompanhamento da qualidade da água.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Frequência de atualização dos dados</strong>

              <span>
                Defina com que frequência os dados dos dispositivos serão
                atualizados.
              </span>
            </div>

            <select className={estilos.select}>
              <option>Automático</option>
              <option>5 minutos</option>
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>1 hora</option>
            </select>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Notificações para água contaminada</strong>

              <span>
                Receba alertas quando uma análise identificar água contaminada.
              </span>
            </div>

            <label className={estilos.switch}>
              <input type="checkbox" defaultChecked />
              <span className={estilos.slider}></span>
            </label>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Responsáveis por receber alertas</strong>

              <span>
                Defina quais responsáveis receberão notificações sobre
                alterações na qualidade da água.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaUsers />
              Configurar
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Limites para alertas</strong>

              <span>
                Configure os limites utilizados para gerar alertas durante o
                monitoramento.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaSlidersH />
              Configurar
            </button>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaMicrochip />

          <div>
            <h2>Dispositivos</h2>
            <p>Gerencie os dispositivos utilizados pelo sistema.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Gerenciar sensores e dispositivos</strong>

              <span>
                Adicione, remova ou configure os dispositivos vinculados ao
                sistema.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaMicrochip />
              Gerenciar
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Status dos dispositivos</strong>

              <span>
                Visualize o estado atual dos sensores e dispositivos conectados.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaWifi />
              Visualizar
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Testar comunicação com o dispositivo</strong>

              <span>
                Verifique se a comunicação entre o sistema e o dispositivo está
                funcionando corretamente.
              </span>
            </div>

            <button className={estilos.botao}>Testar comunicação</button>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaUsers />

          <div>
            <h2>Equipe</h2>
            <p>Gerencie os responsáveis pelo sistema.</p>
          </div>
        </div>

        <div className={estilos.opcao}>
          <div className={estilos.info}>
            <strong>Responsáveis</strong>

            <span>
              Adicione ou remova responsáveis que terão acesso às configurações
              e alertas da instituição.
            </span>
          </div>

          <button className={estilos.botao}>
            <FaUserPlus />
            Gerenciar equipe
          </button>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaInfoCircle />

          <div>
            <h2>Sobre</h2>
            <p>Informações sobre a aplicação SIP.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.informacao}>
            <strong>Versão da aplicação</strong>
            <span>v1.0.0</span>
          </div>

          <div className={estilos.informacao}>
            <strong>Equipe de desenvolvimento</strong>
            <span>Equipe SIP</span>
          </div>

          <div className={estilos.informacao}>
            <strong>Contato para suporte</strong>
            <span>Entre em contato com a equipe responsável.</span>
          </div>

          <div className={estilos.informacao}>
            <strong>Perguntas frequentes (FAQ)</strong>

            <button className={estilos.botao}>Acessar FAQ</button>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaDatabase />

          <div>
            <h2>Dados</h2>
            <p>Gerencie e exporte os dados das análises.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Histórico das análises</strong>

              <span>
                Baixe uma cópia do histórico de análises realizadas pelo
                sistema.
              </span>
            </div>

            <button className={estilos.botao}>Baixar histórico</button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Exportar dados em PDF</strong>

              <span>Gere um arquivo PDF com os dados das análises.</span>
            </div>

            <button className={estilos.botao}>
              <FaFilePdf />
              Exportar PDF
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Exportar dados em CSV</strong>

              <span>
                Exporte os dados das análises para utilização em outras
                aplicações.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaFileCsv />
              Exportar CSV
            </button>
          </div>

          <div className={`${estilos.opcao} ${estilos.perigo}`}>
            <div className={estilos.info}>
              <strong>Limpar cache da aplicação</strong>

              <span>
                Remova dados temporários armazenados localmente pela aplicação.
              </span>
            </div>

            <button className={estilos.botaoPerigo}>
              <FaTrash />
              Limpar cache
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
