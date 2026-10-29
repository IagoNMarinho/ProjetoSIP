import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Droplets,
  FlaskConical,
  Gauge,
  Medal,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Waves,
} from "lucide-react";
import styles from "./Amigos.module.css";

type StatusAgua = "Adequada" | "Atenção" | "Crítica";

type Amigo = {
  id: number;
  nome: string;
  sobrenome: string;
  cargo: string;
  avatar: string;
  progresso: number;
  pontos: number;
  analises: number;
  atividade: string;
  data: string;
  status: StatusAgua;
  ph: string;
  turbidez: string;
  tds: string;
  temperatura: string;
};

const amigosIniciais: Amigo[] = [
  {
    id: 1,
    nome: "Zendaya",
    sobrenome: "",
    cargo: "Pesquisadora",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Zendaya&backgroundColor=b6e3f4",
    progresso: 92,
    pontos: 980,
    analises: 24,
    atividade: "Análise do reservatório",
    data: "19 Out",
    status: "Adequada",
    ph: "7,2",
    turbidez: "1,1 NTU",
    tds: "180 ppm",
    temperatura: "24,5 °C",
  },
  {
    id: 2,
    nome: "The Weeknd",
    sobrenome: "",
    cargo: "Analista ambiental",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TheWeeknd&backgroundColor=c0e8ff",
    progresso: 85,
    pontos: 920,
    analises: 21,
    atividade: "Monitoramento do pH",
    data: "20 Out",
    status: "Adequada",
    ph: "7,0",
    turbidez: "1,4 NTU",
    tds: "195 ppm",
    temperatura: "25,1 °C",
  },
  {
    id: 3,
    nome: "Michael",
    sobrenome: "Jordan",
    cargo: "Estudante pesquisador",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=MichaelJordan&backgroundColor=d1e8ff",
    progresso: 78,
    pontos: 870,
    analises: 19,
    atividade: "Leitura de turbidez",
    data: "21 Out",
    status: "Atenção",
    ph: "6,4",
    turbidez: "3,8 NTU",
    tds: "240 ppm",
    temperatura: "25,8 °C",
  },
  {
    id: 4,
    nome: "Taylor",
    sobrenome: "Swift",
    cargo: "Pesquisadora",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=TaylorSwift&backgroundColor=e0e7ff",
    progresso: 75,
    pontos: 820,
    analises: 18,
    atividade: "Análise de sólidos dissolvidos",
    data: "22 Out",
    status: "Adequada",
    ph: "7,1",
    turbidez: "1,2 NTU",
    tds: "205 ppm",
    temperatura: "24,9 °C",
  },
  {
    id: 5,
    nome: "Pedro",
    sobrenome: "Pascal",
    cargo: "Técnico de laboratório",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=PedroPascal&backgroundColor=bde0fe",
    progresso: 70,
    pontos: 760,
    analises: 16,
    atividade: "Verificação da temperatura",
    data: "23 Out",
    status: "Atenção",
    ph: "6,2",
    turbidez: "4,2 NTU",
    tds: "310 ppm",
    temperatura: "27,2 °C",
  },
  {
    id: 6,
    nome: "Emma",
    sobrenome: "Watson",
    cargo: "Estudante",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=EmmaWatson&backgroundColor=c8e7ff",
    progresso: 68,
    pontos: 720,
    analises: 15,
    atividade: "Inspeção da água escolar",
    data: "24 Out",
    status: "Adequada",
    ph: "7,3",
    turbidez: "1,0 NTU",
    tds: "170 ppm",
    temperatura: "24,0 °C",
  },
  {
    id: 7,
    nome: "Lewis",
    sobrenome: "Hamilton",
    cargo: "Pesquisador",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=LewisHamilton&backgroundColor=a2d2ff",
    progresso: 61,
    pontos: 650,
    analises: 13,
    atividade: "Coleta de dados do sensor",
    data: "25 Out",
    status: "Crítica",
    ph: "5,1",
    turbidez: "8,6 NTU",
    tds: "520 ppm",
    temperatura: "29,4 °C",
  },
  {
    id: 8,
    nome: "Ariana",
    sobrenome: "Grande",
    cargo: "Estudante pesquisadora",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=ArianaGrande&backgroundColor=dbeafe",
    progresso: 58,
    pontos: 610,
    analises: 12,
    atividade: "Relatório de potabilidade",
    data: "26 Out",
    status: "Adequada",
    ph: "7,4",
    turbidez: "1,3 NTU",
    tds: "190 ppm",
    temperatura: "24,7 °C",
  },
];

const statusIcones = {
  Adequada: CheckCircle2,
  Atenção: Activity,
  Crítica: ShieldCheck,
};

export default function Amigos() {
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState<"todos" | "ranking">("todos");
  const [filtroStatus, setFiltroStatus] = useState<
    "Todos" | StatusAgua
  >("Todos");
  const [amigoSelecionado, setAmigoSelecionado] =
    useState<Amigo | null>(null);

  const amigosOrdenados = useMemo(
    () => [...amigosIniciais].sort((a, b) => b.pontos - a.pontos),
    []
  );

  const amigosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    return amigosOrdenados.filter((amigo) => {
      const correspondeBusca = `${amigo.nome} ${amigo.sobrenome} ${amigo.cargo} ${amigo.atividade}`
        .toLocaleLowerCase("pt-BR")
        .includes(termo);

      const correspondeStatus =
        filtroStatus === "Todos" || amigo.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [busca, filtroStatus, amigosOrdenados]);

  const totalAnalises = amigosIniciais.reduce(
    (total, amigo) => total + amigo.analises,
    0
  );

  const totalAdequadas = amigosIniciais.filter(
    (amigo) => amigo.status === "Adequada"
  ).length;

  const campeao = amigosOrdenados[0];

  return (
    <main className={styles.pagina}>
      <section className={styles.dashboard}>
        <div className={styles.conteudo}>
          <section className={styles.areaPrincipal}>
            <header className={styles.cabecalho}>
              <div>
                <span className={styles.sobretitulo}>
                  SISTEMA INFORMATIVO DE POTABILIDADE
                </span>

                <h1>
                  Comunidade <Droplets aria-hidden="true" />
                </h1>

                <p className={styles.subtitulo}>
                  Acompanhe as análises, compartilhe descobertas e
                  contribua para uma água mais segura.
                </p>
              </div>

              <div className={styles.indicadorSistema}>
                <span className={styles.pontoOnline} />
                <span>SIP conectado</span>
              </div>
            </header>

            <section className={styles.resumo}>
              <article className={styles.resumoItem}>
                <span className={styles.resumoIcone}>
                  <Users />
                </span>
                <div>
                  <span>Comunidade</span>
                  <strong>{amigosIniciais.length} membros</strong>
                  <small>Participantes do SIP</small>
                </div>
              </article>

              <article className={styles.resumoItem}>
                <span className={styles.resumoIcone}>
                  <FlaskConical />
                </span>
                <div>
                  <span>Análises realizadas</span>
                  <strong>{totalAnalises}</strong>
                  <small>Registros de exemplo</small>
                </div>
              </article>

              <article className={styles.resumoItem}>
                <span className={styles.resumoIcone}>
                  <ShieldCheck />
                </span>
                <div>
                  <span>Resultados adequados</span>
                  <strong>
                    {Math.round(
                      (totalAdequadas / amigosIniciais.length) * 100
                    )}
                    %
                  </strong>
                  <small>Dos membros com registro</small>
                </div>
              </article>
            </section>

            <div className={styles.secaoTitulo}>
              <div>
                <h2>Meus colegas</h2>
                <p>
                  Veja a atividade da comunidade e os registros recentes.
                </p>
              </div>

              <div className={styles.contadorMembros}>
                <Users size={16} />
                {amigosFiltrados.length} membros
              </div>
            </div>

            <div className={styles.controles}>
              <label className={styles.busca}>
                <Search size={19} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Buscar por nome ou atividade..."
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  aria-label="Buscar colegas"
                />
              </label>

              <div className={styles.filtros}>
                {(
                  ["Todos", "Adequada", "Atenção", "Crítica"] as const
                ).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFiltroStatus(status)}
                    className={`${styles.filtro} ${
                      filtroStatus === status ? styles.filtroAtivo : ""
                    } ${styles[`filtro${status.replace("ã", "a")}`] ?? ""}`}
                    aria-pressed={filtroStatus === status}
                  >
                    {status !== "Todos" &&
                      (() => {
                        const Icone = statusIcones[status];
                        return <Icone size={14} />;
                      })()}
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.abas}>
              <button
                type="button"
                className={`${styles.aba} ${
                  aba === "todos" ? styles.abaAtiva : ""
                }`}
                onClick={() => setAba("todos")}
              >
                Todos os colegas
              </button>

              <button
                type="button"
                className={`${styles.aba} ${
                  aba === "ranking" ? styles.abaAtiva : ""
                }`}
                onClick={() => setAba("ranking")}
              >
                Destaques da comunidade
              </button>
            </div>

            {aba === "todos" ? (
              <div className={styles.grade} id="lista-amigos">
                {amigosFiltrados.map((amigo) => {
                  const IconeStatus = statusIcones[amigo.status];

                  return (
                    <article
                      className={styles.cartao}
                      key={amigo.id}
                      onClick={() => setAmigoSelecionado(amigo)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Ver detalhes de ${amigo.nome} ${amigo.sobrenome}`}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          setAmigoSelecionado(amigo);
                        }
                      }}
                    >
                      <div className={styles.cartaoTopo}>
                        <div className={styles.data}>
                          <CalendarDays size={15} />
                          <span>{amigo.data}</span>
                        </div>

                        <span className={styles.pontos}>
                          <Sparkles size={13} />
                          {amigo.pontos} pts
                        </span>
                      </div>

                      <div className={styles.retrato}>
                        <div className={styles.orbita} />
                        <div className={styles.orbitaSecundaria} />

                        <img
                          src={amigo.avatar}
                          alt={`Avatar ilustrado de ${amigo.nome} ${amigo.sobrenome}`}
                          className={styles.avatarGrande}
                          loading="lazy"
                        />

                        <span
                          className={`${styles.statusBadge} ${
                            styles[
                              `status${amigo.status.replace("ã", "a")}`
                            ] ?? ""
                          }`}
                        >
                          <IconeStatus size={13} />
                          {amigo.status}
                        </span>
                      </div>

                      <div className={styles.identidade}>
                        <h3>
                          {amigo.nome} {amigo.sobrenome}
                        </h3>
                        <p>{amigo.cargo}</p>
                      </div>

                      <div className={styles.atividade}>
                        <div className={styles.atividadeIcone}>
                          <Waves size={17} />
                        </div>

                        <div className={styles.atividadeTexto}>
                          <span>Último registro</span>
                          <strong>{amigo.atividade}</strong>
                        </div>

                        <ChevronRight
                          size={17}
                          className={styles.setaAtividade}
                        />
                      </div>

                      <div className={styles.indicadores}>
                        <div>
                          <span>
                            <Gauge size={13} /> pH
                          </span>
                          <strong>{amigo.ph}</strong>
                        </div>
                        <div>
                          <span>
                            <Waves size={13} /> Turbidez
                          </span>
                          <strong>{amigo.turbidez}</strong>
                        </div>
                      </div>

                      <div className={styles.progresso}>
                        <div className={styles.progressoLinha}>
                          <span>Participação nas atividades</span>
                          <strong>{amigo.progresso}%</strong>
                        </div>

                        <div
                          className={styles.progressoTrilho}
                          role="progressbar"
                          aria-label={`Participação de ${amigo.nome}`}
                          aria-valuenow={amigo.progresso}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span
                            style={{ width: `${amigo.progresso}%` }}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}

                {amigosFiltrados.length === 0 && (
                  <div className={styles.vazio}>
                    <Search size={30} />
                    <h3>Nenhum colega encontrado</h3>
                    <p>
                      Experimente outro nome ou selecione um status
                      diferente.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setBusca("");
                        setFiltroStatus("Todos");
                      }}
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.listaRanking}>
                {amigosFiltrados.map((amigo, index) => (
                  <button
                    type="button"
                    className={styles.linhaRanking}
                    key={amigo.id}
                    onClick={() => setAmigoSelecionado(amigo)}
                  >
                    <span className={styles.posicao}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <img src={amigo.avatar} alt="" />

                    <div className={styles.nomeRanking}>
                      <strong>
                        {amigo.nome} {amigo.sobrenome}
                      </strong>
                      <span>
                        {amigo.analises} análises registradas
                      </span>
                    </div>

                    <div className={styles.pontosRanking}>
                      <strong>{amigo.pontos}</strong>
                      <span>pontos</span>
                    </div>

                    <ArrowRight size={18} />
                  </button>
                ))}
              </div>
            )}

            <section className={styles.destaqueAprendizado}>
              <div className={styles.destaqueIcone}>
                <Droplets size={27} />
              </div>

              <div>
                <span className={styles.sobretitulo}>
                  CONHECIMENTO QUE PROTEGE
                </span>
                <h2>Monitorar é cuidar.</h2>
                <p>
                  O SIP reúne informações dos sensores para auxiliar
                  na identificação de alterações na qualidade da água.
                  Compartilhe conhecimento e ajude sua comunidade a
                  acompanhar os resultados.
                </p>
              </div>

              <div className={styles.destaqueDecoracao}>
                <Waves size={100} />
              </div>
            </section>
          </section>

          <aside className={styles.lateral} id="ranking">
            <div className={styles.tituloRanking}>
              <div>
                <span className={styles.sobretitulo}>
                  COMUNIDADE SIP
                </span>
                <h2>Em destaque</h2>
              </div>
              <Trophy size={27} />
            </div>

            <div className={styles.campeao}>
              <div className={styles.aureola}>
                <div className={styles.aureolaBrilho} />
                <img src={campeao.avatar} alt="" />
                <span className={styles.medalha}>
                  <Award size={20} />
                </span>
              </div>

              <span className={styles.etiquetaDestaque}>
                <TrendingUp size={13} />
                MAIOR PONTUAÇÃO
              </span>

              <h3>
                {campeao.nome} {campeao.sobrenome}
              </h3>

              <p>{campeao.cargo}</p>

              <div className={styles.pontuacaoCampeao}>
                <Sparkles size={16} />
                <strong>{campeao.pontos}</strong>
                <span>pontos</span>
              </div>

              <div className={styles.progressoCampeao}>
                <div>
                  <span>Participação</span>
                  <strong>{campeao.progresso}%</strong>
                </div>
                <div className={styles.progressoTrilho}>
                  <span
                    style={{ width: `${campeao.progresso}%` }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.rankingCabecalho}>
              <h3>Classificação</h3>
              <span>Por pontuação</span>
            </div>

            <div className={styles.rankingLista}>
              {amigosOrdenados.slice(1, 7).map((amigo, index) => (
                <button
                  type="button"
                  className={styles.rankingItem}
                  key={amigo.id}
                  onClick={() => setAmigoSelecionado(amigo)}
                >
                  <span className={styles.numeroRanking}>
                    {String(index + 2).padStart(2, "0")}
                  </span>

                  <img src={amigo.avatar} alt="" />

                  <div className={styles.rankingPessoa}>
                    <strong>
                      {amigo.nome} {amigo.sobrenome}
                    </strong>
                    <span>{amigo.analises} análises</span>
                  </div>

                  <span className={styles.pontosMini}>
                    {amigo.pontos}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.resumoSensores}>
              <div className={styles.resumoSensoresTopo}>
                <span className={styles.iconeSensor}>
                  <Activity size={19} />
                </span>
                <div>
                  <strong>Monitoramento SIP</strong>
                  <span>Parâmetros acompanhados</span>
                </div>
              </div>

              <div className={styles.sensorItem}>
                <span>pH</span>
                <span>Acidez e alcalinidade</span>
              </div>
              <div className={styles.sensorItem}>
                <span>Turbidez</span>
                <span>Clareza da água</span>
              </div>
              <div className={styles.sensorItem}>
                <span>TDS</span>
                <span>Sólidos dissolvidos</span>
              </div>
              <div className={styles.sensorItem}>
                <span>Temperatura</span>
                <span>Condição térmica</span>
              </div>

              <div className={styles.notaSensores}>
                <ShieldCheck size={15} />
                <p>
                  Os resultados auxiliam no monitoramento e não
                  substituem uma análise laboratorial completa.
                </p>
              </div>
            </div>

            <div className={styles.rodapeLateral}>
              <Droplets size={17} />
              <span>SIP · Monitoramento da potabilidade</span>
            </div>
          </aside>
        </div>
      </section>

      {amigoSelecionado && (
        <div
          className={styles.modalFundo}
          onClick={() => setAmigoSelecionado(null)}
          role="presentation"
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-amigo"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.fecharModal}
              onClick={() => setAmigoSelecionado(null)}
              aria-label="Fechar detalhes"
            >
              ×
            </button>

            <div className={styles.modalCabecalho}>
              <div className={styles.avatarModalFundo}>
                <img
                  src={amigoSelecionado.avatar}
                  alt=""
                  className={styles.avatarModal}
                />
              </div>

              <span className={styles.sobretitulo}>
                PERFIL DA COMUNIDADE
              </span>

              <h2 id="titulo-amigo">
                {amigoSelecionado.nome} {amigoSelecionado.sobrenome}
              </h2>

              <p>{amigoSelecionado.cargo}</p>
            </div>

            <div className={styles.modalEstatisticas}>
              <div>
                <Activity size={19} />
                <strong>{amigoSelecionado.analises}</strong>
                <span>Análises</span>
              </div>
              <div>
                <Medal size={19} />
                <strong>{amigoSelecionado.pontos}</strong>
                <span>Pontos</span>
              </div>
              <div>
                <TrendingUp size={19} />
                <strong>{amigoSelecionado.progresso}%</strong>
                <span>Participação</span>
              </div>
            </div>

            <div className={styles.modalSecao}>
              <h3>
                <FlaskConical size={18} />
                Último registro
              </h3>

              <p>{amigoSelecionado.atividade}</p>

              <span className={styles.modalData}>
                <Clock3 size={14} />
                {amigoSelecionado.data}
              </span>
            </div>

            <div className={styles.modalParametros}>
              <div>
                <span>pH</span>
                <strong>{amigoSelecionado.ph}</strong>
              </div>
              <div>
                <span>Turbidez</span>
                <strong>{amigoSelecionado.turbidez}</strong>
              </div>
              <div>
                <span>TDS</span>
                <strong>{amigoSelecionado.tds}</strong>
              </div>
              <div>
                <span>Temperatura</span>
                <strong>{amigoSelecionado.temperatura}</strong>
              </div>
            </div>

            <div
              className={`${styles.modalStatus} ${
                styles[
                  `status${amigoSelecionado.status.replace("ã", "a")}`
                ] ?? ""
              }`}
            >
              {(() => {
                const Icone = statusIcones[amigoSelecionado.status];
                return <Icone size={18} />;
              })()}
              <span>
                Status registrado: <strong>{amigoSelecionado.status}</strong>
              </span>
            </div>

            <p className={styles.avisoModal}>
              Dados demonstrativos para apresentação visual. Os valores
              reais e a classificação de potabilidade devem vir das
              leituras do dispositivo SIP e dos critérios técnicos
              adotados pelo projeto.
            </p>

            <button
              type="button"
              className={styles.botaoModal}
              onClick={() => setAmigoSelecionado(null)}
            >
              Fechar detalhes
              <ArrowRight size={17} />
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
