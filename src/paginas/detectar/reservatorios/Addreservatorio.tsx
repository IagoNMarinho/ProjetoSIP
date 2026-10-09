import estilos from "./Addreservatorio.module.css";
import { GiWaterTank } from "react-icons/gi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { BiSolidCarousel } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

import { useState } from "react";
import {
  ModalReservatorio,
  type DadosReservatorio,
} from "../../../componentes/SUPORTE/modal/ModalReservatorio";
import { Confirmar } from "../../../componentes/SUPORTE/confirmar/Confirmar";
import { ModalMensagem } from "../../../componentes/SUPORTE/modal/ModalMensagem";
import {
  useReservatorios,
  type Reservatorio,
} from "../../../hooks/useReservatorios";

type Visualizacao = "carrossel" | "lista";

export function Addreservatorio() {
  const {
    reservatorios,
    emUsoId,
    carregando,
    erro,
    adicionar,
    editar,
    excluir,
    utilizar,
  } = useReservatorios(); //busca os reservatorios reais do Firestore, ja em tempo real

  const [ativo, setAtivo] = useState(0);
  const total = reservatorios.length;

  const [visualizacao, setVisualizacao] = useState<Visualizacao>(() =>
    localStorage.getItem("visualizacaoReservatorios") === "lista"
      ? "lista"
      : "carrossel",
  );

  function escolher(nova: Visualizacao) {
    setVisualizacao(nova);
    localStorage.setItem("visualizacaoReservatorios", nova);
  }

  function posicao(indice: number) {
    let diferenca = (indice - ativo + total) % total;
    if (diferenca > total / 2) diferenca -= total;
    if (diferenca === 0) return estilos.ativo;
    if (diferenca === -1) return estilos.anterior;
    if (diferenca === 1) return estilos.proximo;
    return estilos.oculto;
  }

  function anterior() {
    setAtivo((atual) => (atual - 1 + total) % total);
  }

  function proximo() {
    setAtivo((atual) => (atual + 1) % total);
  }

  const [modalReservatorio, setModalReservatorio] = useState(false);
  const [modoReservatorio, setModoReservatorio] = useState<
    "adicionar" | "editar"
  >("adicionar");
  const [reservatorioEmEdicao, setReservatorioEmEdicao] =
    useState<DadosReservatorio | null>(null);

  function abrirEdicao(reservatorio: Reservatorio) {
    setModoReservatorio("editar");
    setReservatorioEmEdicao(reservatorio);
    setModalReservatorio(true);
  }
//modal de confirmacao da exclusao: guarda qual reservatorio o usuario quer excluir
  const [reservatorioParaExcluir, setReservatorioParaExcluir] =
    useState<Reservatorio | null>(null);

  //modal de mensagem para os erros (null = fechado)
  const [mensagem, setMensagem] = useState<{
    titulo: string;
    texto: string;
  } | null>(null);

  async function excluirReservatorio() {
    if (!reservatorioParaExcluir) return;

    const reservatorio = reservatorioParaExcluir;
    setReservatorioParaExcluir(null);

    try {
      await excluir(reservatorio.id);
      setAtivo(0);
    } catch {
      setMensagem({
        titulo: "Erro ao excluir",
        texto: "Não foi possível excluir o reservatório. Tente novamente.",
      });
    }
  }

  async function aoSalvar(dados: DadosReservatorio) {
    try {
      if (modoReservatorio === "editar" && reservatorioEmEdicao?.id) {
        await editar(reservatorioEmEdicao.id, dados);
      } else {
        await adicionar(dados);
      }
      setModalReservatorio(false);
    } catch {
      setMensagem({
        titulo: "Erro ao salvar",
        texto: "Não foi possível salvar o reservatório. Tente novamente.",
      });
    }
  }

  async function aoUtilizar(reservatorio: Reservatorio) {
    try {
      await utilizar(reservatorio);
    } catch {
      setMensagem({
        titulo: "Erro ao selecionar",
        texto: "Não foi possível definir o reservatório em uso. Tente novamente.",
      });
    }
  }

  //texto do modal de exclusao: avisa quando o reservatorio apagado e o que esta em uso
  const textoExclusao = reservatorioParaExcluir
    ? reservatorioParaExcluir.id === emUsoId
      ? `${reservatorioParaExcluir.codigo} está em uso. Se excluir, as próximas análises serão salvas sem local. Deseja continuar?`
      : `Deseja excluir ${reservatorioParaExcluir.codigo}? As análises já realizadas continuam salvas.`
    : "";

  return (
    <main className={estilos.pagina}>
      <div className={estilos.titulo2}>
        <h1>Reservatórios</h1>
        <small>Aqui você terá acesso ao gerenciamento de reservatórios.</small>
      </div>
      <div className={estilos.borda}></div>
      <div className={estilos.alternador}>
        <button
          className={`${estilos.opcao} ${visualizacao === "lista" ? estilos.opcaoAtiva : ""}`}
          onClick={() => escolher("lista")}
          aria-pressed={visualizacao === "lista"}
        >
          <FaThList />
          Lista
        </button>
        <button
          className={`${estilos.opcao} ${visualizacao === "carrossel" ? estilos.opcaoAtiva : ""}`}
          onClick={() => escolher("carrossel")}
          aria-pressed={visualizacao === "carrossel"}
        >
          <BiSolidCarousel />
          Carrossel
        </button>
      </div>

      {carregando && <p>Carregando reservatórios...</p>}
      {erro && <p>Erro ao carregar reservatórios: {erro}</p>}
      {!carregando && !erro && total === 0 && (
        <p>Nenhum reservatório cadastrado.</p>
      )}

      {total > 0 &&
        (visualizacao === "carrossel" ? (
          <section className={estilos.carrossel}>
            <button
              className={estilos.seta}
              onClick={anterior}
              aria-label="Reservatório anterior"
            >
              <FaChevronLeft />
            </button>

            <div className={estilos.palco}>
              {reservatorios.map((reservatorio, indice) => (
                <article
                  key={reservatorio.id}
                  className={`${estilos.cartao} ${posicao(indice)}`}
                  onClick={() => setAtivo(indice)}
                >
                  <header className={estilos.cabecalho}>
                    <h3>{reservatorio.codigo}</h3>
                  </header>

                  <dl className={estilos.corpo}>
                    <div className={estilos.linha}>
                      <dt className={estilos.rotulo}>Local:</dt>
                      <dd className={estilos.resultado}>
                        {reservatorio.local}
                      </dd>
                    </div>
                    <div className={estilos.linha}>
                      <dt className={estilos.rotulo}>Instituição:</dt>
                      <dd className={estilos.resultado}>
                        {reservatorio.instituicao || "—"}
                      </dd>
                    </div>
                    <div className={estilos.linha}>
                      <dt className={estilos.rotulo}>Endereço:</dt>
                      <dd className={estilos.resultado}>
                        {reservatorio.endereco}
                      </dd>
                    </div>
                    <div className={estilos.linha}>
                      <dt className={estilos.rotulo}>Criado em:</dt>
                      <dd className={estilos.resultado}>
                        {reservatorio.criadoEm.toLocaleDateString("pt-BR")}
                      </dd>
                    </div>
                  </dl>

                  <div className={estilos.rodape}>
                    <button
                      className={`${estilos.botaoUtilizar} ${emUsoId === reservatorio.id ? estilos.emUso : ""}`}
                      onClick={() => aoUtilizar(reservatorio)}
                      disabled={emUsoId === reservatorio.id}
                    >
                      {emUsoId === reservatorio.id ? "Em uso" : "Utilizar"}
                    </button>
                    <button
                      onClick={() => abrirEdicao(reservatorio)}
                      className={estilos.botaoIcone}
                      aria-label="Editar"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => setReservatorioParaExcluir(reservatorio)}
                      className={estilos.botaoIcone}
                      aria-label="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              className={estilos.seta}
              onClick={proximo}
              aria-label="Próximo reservatório"
            >
              <FaChevronRight />
            </button>

            <div className={estilos.pontos}>
              {reservatorios.map((reservatorio, indice) => (
                <button
                  key={reservatorio.id}
                  className={`${estilos.ponto} ${indice === ativo ? estilos.pontoAtivo : ""}`}
                  onClick={() => setAtivo(indice)}
                  aria-label={`Ir para ${reservatorio.codigo}`}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className={estilos.lista}>
            {reservatorios.map((reservatorio) => (
              <article key={reservatorio.id} className={estilos.item}>
                <div className={estilos.icone}>
                  <GiWaterTank className={estilos.icon} />
                </div>
                <div className={estilos.info}>
                  <h2>{reservatorio.codigo}</h2>
                  <div className={estilos.dados}>
                    <p>
                      Local:
                      <span>{reservatorio.local}</span>
                    </p>
                    <p>
                      Instituição:
                      <span>{reservatorio.instituicao || "—"}</span>
                    </p>
                    <p>
                      Endereço:
                      <span>{reservatorio.endereco}</span>
                    </p>
                    <p>
                      Criado em:
                      <span>
                        {reservatorio.criadoEm.toLocaleDateString("pt-BR")}
                      </span>
                    </p>
                  </div>
                  <div className={estilos.botoes}>
                    <button
                      className={`${estilos.botaoUtilizar} ${emUsoId === reservatorio.id ? estilos.emUso : ""}`}
                      onClick={() => aoUtilizar(reservatorio)}
                      disabled={emUsoId === reservatorio.id}
                    >
                      {emUsoId === reservatorio.id ? "Em uso" : "Utilizar"}
                    </button>
                    <button
                      onClick={() => abrirEdicao(reservatorio)}
                      className={estilos.botaoIcone}
                      aria-label="Editar"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => setReservatorioParaExcluir(reservatorio)}
                      className={estilos.botaoIcone}
                      aria-label="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ))}

      <button
        type="button"
        className={estilos.add}
        onClick={() => {
          setModoReservatorio("adicionar");
          setReservatorioEmEdicao(null);
          setModalReservatorio(true);
        }}
      >
        <FaPlus />
        adicionar reservatorio
      </button>

      <ModalReservatorio
        key={`${modoReservatorio}-${reservatorioEmEdicao?.id ?? "novo"}`}
        exibir={modalReservatorio}
        modo={modoReservatorio}
        reservatorioSelecionado={reservatorioEmEdicao}
        salvar={aoSalvar}
        ocultar={() => setModalReservatorio(false)}
      />

      <Confirmar
        exibir={reservatorioParaExcluir !== null}
        ocultar={() => setReservatorioParaExcluir(null)}
        titulo="Excluir reservatório"
        texto={textoExclusao}
        aoConfirmar={excluirReservatorio}
      />

      <ModalMensagem
        exibir={mensagem !== null}
        ocultar={() => setMensagem(null)}
        titulo={mensagem?.titulo ?? ""}
        texto={mensagem?.texto ?? ""}
      />
    </main>
  );
}
