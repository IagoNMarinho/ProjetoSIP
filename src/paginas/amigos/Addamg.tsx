import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Check,
  CheckCheck,
  Droplets,
  Filter,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  Waves,
  X,
} from "lucide-react";
import styles from "./AddAmg.module.css";

type Usuario = {
  id: number;
  nome: string;
  usuario: string;
  cargo: string;
  avatar: string;
  analises: number;
  status: "Adequada" | "Atenção" | "Crítica";
  interesses: string[];
  conectado: boolean;
};

const usuariosIniciais: Usuario[] = [
  {
    id: 1,
    nome: "Mariana Costa",
    usuario: "@marianacosta",
    cargo: "Pesquisadora ambiental",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=MarianaCosta&backgroundColor=b6e3f4",
    analises: 28,
    status: "Adequada",
    interesses: ["Qualidade da água", "Sensores"],
    conectado: true,
  },
  {
    id: 2,
    nome: "Gabriel Oliveira",
    usuario: "@gabriel.oliveira",
    cargo: "Estudante de tecnologia",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=GabrielOliveira&backgroundColor=c0e8ff",
    analises: 19,
    status: "Adequada",
    interesses: ["Arduino", "IoT"],
    conectado: true,
  },
  {
    id: 3,
    nome: "Ana Beatriz",
    usuario: "@anabeatriz",
    cargo: "Analista ambiental",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=AnaBeatriz&backgroundColor=dbeafe",
    analises: 32,
    status: "Atenção",
    interesses: ["Potabilidade", "Pesquisa"],
    conectado: false,
  },
  {
    id: 4,
    nome: "Lucas Mendes",
    usuario: "@lucasmendes",
    cargo: "Desenvolvedor IoT",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=LucasMendes&backgroundColor=a2d2ff",
    analises: 24,
    status: "Adequada",
    interesses: ["Arduino", "Automação"],
    conectado: true,
  },
  {
    id: 5,
    nome: "Sofia Almeida",
    usuario: "@sofia.almeida",
    cargo: "Estudante pesquisadora",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=SofiaAlmeida&backgroundColor=c8e7ff",
    analises: 15,
    status: "Crítica",
    interesses: ["Sustentabilidade", "Água"],
    conectado: false,
  },
  {
    id: 6,
    nome: "Rafael Santos",
    usuario: "@rafaelsantos",
    cargo: "Técnico de laboratório",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=RafaelSantos&backgroundColor=bde0fe",
    analises: 21,
    status: "Adequada",
    interesses: ["Análise da água", "Sensores"],
    conectado: true,
  },
  {
    id: 7,
    nome: "Isabela Ferreira",
    usuario: "@isabelaferreira",
    cargo: "Pesquisadora",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=IsabelaFerreira&backgroundColor=e0e7ff",
    analises: 36,
    status: "Adequada",
    interesses: ["Meio ambiente", "Pesquisa"],
    conectado: false,
  },
  {
    id: 8,
    nome: "Pedro Henrique",
    usuario: "@pedrohenrique",
    cargo: "Estudante de engenharia",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=PedroHenrique&backgroundColor=90dbf4",
    analises: 12,
    status: "Atenção",
    interesses: ["Arduino", "Eletrônica"],
    conectado: false,
  },
];

type Filtro = "Todos" | "Sugestões" | "Não adicionados";

export default function AddAmg() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [solicitacoes, setSolicitacoes] = useState<number[]>([]);
  const [solicitacoesRecebidas, setSolicitacoesRecebidas] = useState<
    number[]
  >([]);
  const [mensagem, setMensagem] = useState("");

  const usuariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    return usuariosIniciais.filter((usuario) => {
      const textoUsuario =
        `${usuario.nome} ${usuario.usuario} ${usuario.cargo} ${usuario.interesses.join(" ")}`
          .toLocaleLowerCase("pt-BR");

      const correspondeBusca = textoUsuario.includes(termo);

      const correspondeFiltro =
        filtro === "Todos" ||
        (filtro === "Sugestões" && usuario.conectado) ||
        (filtro === "Não adicionados" &&
          !solicitacoes.includes(usuario.id) &&
          !solicitacoesRecebidas.includes(usuario.id));

      return (
        correspondeBusca &&
        correspondeFiltro &&
        !solicitacoesRecebidas.includes(usuario.id)
      );
    });
  }, [busca, filtro, solicitacoes, solicitacoesRecebidas]);

  const enviarSolicitacao = (id: number, nome: string) => {
    setSolicitacoes((atuais) =>
      atuais.includes(id) ? atuais : [...atuais, id]
    );
    setMensagem(`Solicitação enviada para ${nome}!`);
  };

  const cancelarSolicitacao = (id: number, nome: string) => {
    setSolicitacoes((atuais) => atuais.filter((item) => item !== id));
    setMensagem(`Solicitação para ${nome} cancelada.`);
  };

  const aceitarSolicitacao = (id: number, nome: string) => {
    setSolicitacoesRecebidas((atuais) => [...atuais, id]);
    setMensagem(`Você e ${nome} agora fazem parte da mesma comunidade!`);
  };

  const totalPendentes = solicitacoes.length;

  return (
    <main className={styles.pagina}>
      <div className={styles.fundoAnimado} aria-hidden="true">
        <span className={styles.bolha + " " + styles.bolhaUm} />
        <span className={styles.bolha + " " + styles.bolhaDois} />
        <span className={styles.bolha + " " + styles.bolhaTres} />
        <span className={styles.onda + " " + styles.ondaUm} />
        <span className={styles.onda + " " + styles.ondaDois} />
      </div>

      <section className={styles.conteudo}>
        <header className={styles.cabecalho}>
          <div className={styles.tituloArea}>
            <div className={styles.selo}>
              <Droplets size={15} />
              SISTEMA INFORMATIVO DE POTABILIDADE
            </div>

            <h1>
              Encontre sua <span>conexão</span>
              <Waves className={styles.iconeTitulo} size={38} />
            </h1>

            <p>
              Conecte-se com pessoas que compartilham o interesse pela
              qualidade da água, tecnologia e sustentabilidade.
            </p>
          </div>

          <div className={styles.indicador}>
            <span className={styles.indicadorPonto} />
            Comunidade SIP
            <Droplets size={17} />
          </div>
        </header>

        <section className={styles.banner}>
          <div className={styles.bannerConteudo}>
            <span className={styles.bannerEtiqueta}>
              <Sparkles size={14} />
              UMA REDE QUE FAZ A DIFERENÇA
            </span>

            <h2>
              Ideias que se conectam.
              <br />
              <span>Água que transforma.</span>
            </h2>

            <p>
              Encontre colegas, troque conhecimentos e acompanhe
              descobertas que ajudam a cuidar de um recurso essencial.
            </p>

            <div className={styles.bannerEstatisticas}>
              <div>
                <Users size={20} />
                <span>
                  <strong>{usuariosIniciais.length}</strong>
                  <small>Perfis sugeridos</small>
                </span>
              </div>

              <div>
                <Send size={19} />
                <span>
                  <strong>{totalPendentes}</strong>
                  <small>Pedidos enviados</small>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.bannerVisual} aria-hidden="true">
            <div className={styles.anelUm} />
            <div className={styles.anelDois} />
            <div className={styles.esferaAgua}>
              <Droplets size={76} strokeWidth={1.3} />
            </div>
            <span className={styles.brilhoUm} />
            <span className={styles.brilhoDois} />
            <span className={styles.brilhoTres} />
            <div className={styles.miniSelo}>
              <ShieldCheck size={17} />
              <span>Conexões SIP</span>
            </div>
          </div>
        </section>

        <section className={styles.buscaSecao}>
          <div className={styles.buscaTitulo}>
            <div>
              <span className={styles.sobretitulo}>EXPLORE A COMUNIDADE</span>
              <h2>Quem você quer encontrar?</h2>
              <p>Pesquise pelo nome completo ou pelo @usuário.</p>
            </div>

            <div className={styles.buscaIcone}>
              <Search size={23} />
            </div>
          </div>

          <label className={styles.campoBusca}>
            <Search size={22} />
            <input
              type="search"
              placeholder="Ex.: Mariana Costa ou @marianacosta"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              aria-label="Pesquisar pessoas por nome ou nome de usuário"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca("")}
                aria-label="Limpar pesquisa"
                className={styles.limparBusca}
              >
                <X size={18} />
              </button>
            )}
            <span className={styles.atalhoBusca}>
              <Search size={13} />
              Buscar
            </span>
          </label>

          <div className={styles.filtros}>
            <div className={styles.filtrosLabel}>
              <Filter size={16} />
              Explorar por
            </div>

            {(["Todos", "Sugestões", "Não adicionados"] as const).map(
              (opcao) => (
                <button
                  type="button"
                  key={opcao}
                  className={`${styles.filtro} ${
                    filtro === opcao ? styles.filtroAtivo : ""
                  }`}
                  onClick={() => setFiltro(opcao)}
                  aria-pressed={filtro === opcao}
                >
                  {opcao === "Sugestões" && <Sparkles size={14} />}
                  {opcao === "Não adicionados" && <UserPlus size={14} />}
                  {opcao}
                </button>
              )
            )}
          </div>
        </section>

        {mensagem && (
          <div className={styles.mensagem} role="status">
            <CheckCircleIcon />
            <span>{mensagem}</span>
            <button
              type="button"
              onClick={() => setMensagem("")}
              aria-label="Fechar mensagem"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className={styles.resultados}>
          <div className={styles.resultadosCabecalho}>
            <div>
              <span className={styles.sobretitulo}>PESSOAS PARA CONHECER</span>
              <h2>
                {busca.trim()
                  ? "Resultados da pesquisa"
                  : filtro === "Sugestões"
                    ? "Sugestões para você"
                    : "Descubra novos colegas"}
              </h2>
            </div>

            <span className={styles.contador}>
              {usuariosFiltrados.length}{" "}
              {usuariosFiltrados.length === 1 ? "pessoa" : "pessoas"}
            </span>
          </div>

          {usuariosFiltrados.length > 0 ? (
            <div className={styles.gradeUsuarios}>
              {usuariosFiltrados.map((usuario, index) => {
                const solicitacaoEnviada = solicitacoes.includes(usuario.id);

                return (
                  <article
                    className={styles.cartaoUsuario}
                    key={usuario.id}
                    style={{ animationDelay: `${index * 65}ms` }}
                  >
                    <div className={styles.cartaoBrilho} />

                    <div className={styles.cartaoTopo}>
                      <span className={styles.numeroPerfil}>
                        SIP / {String(usuario.id).padStart(2, "0")}
                      </span>
                      <span
                        className={`${styles.statusPonto} ${
                          styles[
                            `status${usuario.status.replace("ã", "a")}`
                          ] ?? ""
                        }`}
                        title={`Status demonstrativo: ${usuario.status}`}
                      />
                    </div>

                    <div className={styles.avatarArea}>
                      <div className={styles.avatarAnel} />
                      <div className={styles.avatarAnelInterno} />
                      <img
                        src={usuario.avatar}
                        alt={`Avatar ilustrado de ${usuario.nome}`}
                        className={styles.avatar}
                        loading="lazy"
                      />
                      <span className={styles.avatarSelo}>
                        <Droplets size={14} />
                      </span>
                    </div>

                    <div className={styles.identidade}>
                      <h3>{usuario.nome}</h3>
                      <span className={styles.nomeUsuario}>
                        {usuario.usuario}
                      </span>
                      <p>{usuario.cargo}</p>
                    </div>

                    <div className={styles.dadosUsuario}>
                      <div>
                        <Activity size={16} />
                        <span>
                          <strong>{usuario.analises}</strong>
                          análises
                        </span>
                      </div>
                      <div>
                        <Droplets size={16} />
                        <span>
                          <strong>{usuario.interesses.length}</strong>
                          interesses
                        </span>
                      </div>
                    </div>

                    <div className={styles.interesses}>
                      {usuario.interesses.map((interesse) => (
                        <span key={interesse}>{interesse}</span>
                      ))}
                    </div>

                    <div className={styles.cartaoRodape}>
                      {solicitacaoEnviada ? (
                        <button
                          type="button"
                          className={styles.botaoPendente}
                          onClick={() =>
                            cancelarSolicitacao(usuario.id, usuario.nome)
                          }
                        >
                          <Check size={17} />
                          Pedido enviado
                          <span className={styles.cancelarTexto}>
                            Cancelar
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={styles.botaoAdicionar}
                          onClick={() =>
                            enviarSolicitacao(usuario.id, usuario.nome)
                          }
                        >
                          <UserPlus size={17} />
                          Adicionar amigo
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.estadoVazio}>
              <div className={styles.vazioIcone}>
                <Search size={32} />
                <Waves size={20} />
              </div>
              <h3>Nenhuma pessoa encontrada</h3>
              <p>
                Não encontramos perfis com essa pesquisa. Confira o nome
                ou o @usuário e tente novamente.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setFiltro("Todos");
                }}
              >
                Ver todos os perfis
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>

        <section className={styles.dica}>
          <div className={styles.dicaIcone}>
            <ShieldCheck size={25} />
          </div>
          <div>
            <strong>Conexões que geram impacto</strong>
            <p>
              Conhecimento compartilhado fortalece a comunidade e
              contribui para o monitoramento responsável da água.
            </p>
          </div>
          <Waves className={styles.dicaOndas} size={65} />
        </section>

        <footer className={styles.rodape}>
          <Droplets size={17} />
          <span>SIP · Conectando pessoas por uma água melhor</span>
          <span className={styles.rodapePonto} />
          <span>Comunidade demonstrativa</span>
        </footer>
      </section>
    </main>
  );
}

function CheckCircleIcon() {
  return <CheckCheck size={19} aria-hidden="true" />;
}
