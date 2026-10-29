import { useMemo, useState } from "react";
import styles from "./Solicitacoes.module.css";

type AbaSolicitacao = "recebidas" | "enviadas";
type StatusSolicitacao = "pendente" | "aceita" | "recusada";

interface Solicitacao {
  id: number;
  nome: string;
  usuario: string;
  status: StatusSolicitacao;
}

const recebidasIniciais: Solicitacao[] = [
  { id: 1, nome: "Ana Oliveira", usuario: "@anaoliveira", status: "pendente" },
  { id: 2, nome: "Lucas Santos", usuario: "@lucassantos", status: "pendente" },
];

const enviadasIniciais: Solicitacao[] = [
  { id: 3, nome: "Mariana Costa", usuario: "@marianacosta", status: "pendente" },
  { id: 4, nome: "Pedro Almeida", usuario: "@pedroalmeida", status: "pendente" },
];

export default function Solicitacoes() {
  const [abaAtiva, setAbaAtiva] = useState<AbaSolicitacao>("recebidas");
  const [recebidas, setRecebidas] = useState<Solicitacao[]>(recebidasIniciais);
  const [enviadas, setEnviadas] = useState<Solicitacao[]>(enviadasIniciais);
  const [busca, setBusca] = useState("");

  const listaAtual = abaAtiva === "recebidas" ? recebidas : enviadas;

  const solicitacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return listaAtual;

    return listaAtual.filter(
      (solicitacao) =>
        solicitacao.nome.toLowerCase().includes(termo) ||
        solicitacao.usuario.toLowerCase().includes(termo)
    );
  }, [busca, listaAtual]);

  function atualizarStatus(id: number, status: StatusSolicitacao) {
    setRecebidas((lista) =>
      lista.map((solicitacao) =>
        solicitacao.id === id ? { ...solicitacao, status } : solicitacao
      )
    );
  }

  function cancelarSolicitacao(id: number) {
    setEnviadas((lista) =>
      lista.filter((solicitacao) => solicitacao.id !== id)
    );
  }

  function mudarAba(aba: AbaSolicitacao) {
    setAbaAtiva(aba);
    setBusca("");
  }

  const classeAba = (aba: AbaSolicitacao) =>
    abaAtiva === aba
      ? `${styles.solicitacoes__aba} ${styles["solicitacoes__aba--ativa"]}`
      : styles.solicitacoes__aba;

  return (
    <main className={styles.solicitacoes}>
      <header className={styles.solicitacoes__cabecalho}>
        <p className={styles.solicitacoes__identificacao}>
          SIP • Comunidade
        </p>
        <h1>Solicitações de amizade</h1>
        <p>
          Gerencie as solicitações recebidas e acompanhe aquelas que você enviou.
        </p>
      </header>

      <nav
        className={styles.solicitacoes__abas}
        aria-label="Tipos de solicitação"
      >
        <button
          type="button"
          className={classeAba("recebidas")}
          onClick={() => mudarAba("recebidas")}
          aria-pressed={abaAtiva === "recebidas"}
        >
          Recebidas ({recebidas.length})
        </button>

        <button
          type="button"
          className={classeAba("enviadas")}
          onClick={() => mudarAba("enviadas")}
          aria-pressed={abaAtiva === "enviadas"}
        >
          Enviadas ({enviadas.length})
        </button>
      </nav>

      <section
        className={styles.solicitacoes__conteudo}
        aria-label={
          abaAtiva === "recebidas"
            ? "Solicitações recebidas"
            : "Solicitações enviadas"
        }
      >
        <label
          className={styles.solicitacoes__rotuloBusca}
          htmlFor="busca-solicitacoes"
        >
          Buscar por nome ou usuário
        </label>

        <input
          id="busca-solicitacoes"
          className={styles.solicitacoes__busca}
          type="search"
          placeholder="Ex.: Ana ou @anaoliveira"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />

        {solicitacoesFiltradas.length === 0 ? (
          <div className={styles.solicitacoes__vazio} role="status">
            <h2>Nenhuma solicitação encontrada</h2>
            <p>
              {busca.trim()
                ? "Tente pesquisar com outro nome ou usuário."
                : abaAtiva === "recebidas"
                  ? "Você não tem solicitações recebidas nesta lista."
                  : "Você não tem solicitações enviadas nesta lista."}
            </p>
          </div>
        ) : (
          <ul className={styles.solicitacoes__lista}>
            {solicitacoesFiltradas.map((solicitacao) => (
              <li
                className={styles.solicitacoes__item}
                key={solicitacao.id}
              >
                <div
                  className={styles.solicitacoes__avatar}
                  aria-hidden="true"
                >
                  {solicitacao.nome.charAt(0).toUpperCase()}
                </div>

                <div className={styles.solicitacoes__pessoa}>
                  <h2>{solicitacao.nome}</h2>
                  <p>{solicitacao.usuario}</p>
                  <span className={styles.solicitacoes__status}>
                    {solicitacao.status === "pendente"
                      ? "Pendente"
                      : solicitacao.status === "aceita"
                        ? "Aceita"
                        : "Recusada"}
                  </span>
                </div>

                <div className={styles.solicitacoes__acoes}>
                  {abaAtiva === "recebidas" &&
                    solicitacao.status === "pendente" && (
                      <>
                        <button
                          type="button"
                          className={`${styles.solicitacoes__botao} ${styles["solicitacoes__botao--aceitar"]}`}
                          onClick={() =>
                            atualizarStatus(solicitacao.id, "aceita")
                          }
                        >
                          Aceitar
                        </button>

                        <button
                          type="button"
                          className={`${styles.solicitacoes__botao} ${styles["solicitacoes__botao--recusar"]}`}
                          onClick={() =>
                            atualizarStatus(solicitacao.id, "recusada")
                          }
                        >
                          Recusar
                        </button>
                      </>
                    )}

                  {abaAtiva === "enviadas" && (
                    <button
                      type="button"
                      className={`${styles.solicitacoes__botao} ${styles["solicitacoes__botao--cancelar"]}`}
                      onClick={() => cancelarSolicitacao(solicitacao.id)}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}