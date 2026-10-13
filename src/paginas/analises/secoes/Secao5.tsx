import { useState } from "react";
import type { FormEvent } from "react";
import { FaCircle } from "react-icons/fa6";
import estilos from "./Secao5.module.css";
import { useAnalisesCompartilhadas } from "../../../hooks/useAnalisesCompartilhadas";
import type { Analise } from "../../../hooks/useAnalises";
import { ModalAnalises } from "../../../componentes/SUPORTE/modal/ModalAnalises";

export function Secao5() {
  const {
    ehUsuarioComum,
    vinculos,
    vinculosCarregados,
    vinculoAtual,
    selecionarCodigo,
    analises,
    carregandoAnalises,
    erro,
    ativarCodigo,
    desvincular,
  } = useAnalisesCompartilhadas();

  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<"todas" | "detalhes">("todas"); //determina se mostra todas ou detalhes
  const [analiseSelecionada, setAnaliseSelecionada] = useState<Analise | null>(
    null,
  ); //guarda qual análise o usuário clicou
  const analisesRecentes = analises.slice(0, 5);

  const nomeStatus = (status: Analise["status"]) => {
    if (status === "Potável") {
      return "Adequada";
    }
    if (status === "Atenção") {
      return "Pendente";
    }
    return "Crítica";
  };

  const classeStatus = (status: Analise["status"]) => {
    if (status === "Potável") {
      return estilos.adequada;
    }
    if (status === "Atenção") {
      return estilos.pendente;
    }
    return estilos.critico;
  };

  //so aparece para login tipo usuario; instituicao nao ve esta secao
  if (ehUsuarioComum !== true) return null;
  if (!vinculosCarregados) return null;

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensagem("");
    const retorno = await ativarCodigo(codigo.trim().toUpperCase());
    if (retorno === "sucesso") setCodigo("");
    else setMensagem(retorno);
    setEnviando(false);
  };

  return (
    <div className={estilos.conteiner}>
      <div className={estilos.analises}>
        {!vinculoAtual && (
          <>
            <div className={estilos.titulo}>
              <h2>Análises de uma instituição</h2>
            </div>
            <form className={estilos.formulario} onSubmit={enviar}>
              <p className={estilos.texto}>
                Informe o código de acesso da instituição para ver as análises
                dela. Novas análises aparecem aqui automaticamente.
              </p>
              <div className={estilos.campo}>
                <label
                  className={estilos.rotulo}
                  htmlFor="codigo-analises"
                >
                  Código de acesso
                </label>
                <input
                  id="codigo-analises"
                  className={estilos.input}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  placeholder="Digite o código"
                  maxLength={8}
                  autoComplete="off"
                />
                {mensagem && (
                  <p className={estilos.mensagem}>{mensagem}</p>
                )}
              </div>
              <button
                type="submit"
                className={estilos.botao}
                disabled={enviando || codigo.trim().length !== 8}
              >
                {enviando ? "Verificando..." : "Acessar análises"}
              </button>
            </form>
          </>
        )}

        {vinculoAtual && (
          <>
            <div className={estilos.titulo}>
              <h2>Análises de {vinculoAtual.nomeInstituicao}</h2>
              <button
                onClick={() => {
                  setModoModal("todas");
                  setAnaliseSelecionada(null);
                  setModalAberto(true);
                }}
              >
                Ver todas
              </button>
            </div>

            {vinculos.length > 1 && (
              <select
                className={estilos.seletor}
                value={vinculoAtual.dispositivoCodigo}
                onChange={(e) => selecionarCodigo(e.target.value)}
              >
                {vinculos.map((v) => (
                  <option key={v.dispositivoCodigo} value={v.dispositivoCodigo}>
                    {v.nomeInstituicao}
                  </option>
                ))}
              </select>
            )}

            {analisesRecentes.map((analise) => (
              <div className={estilos.card} key={analise.id}>
                <div className={estilos.box1}>
                  <h2>{analise.codigo}</h2>
                  <p>Local: {analise.local ?? "não informado"}</p>
                </div>
                <div className={estilos.box1}>
                  <p>{analise.data.toLocaleDateString("pt-BR")}</p>
                  <p>
                    {analise.data.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className={estilos.box2}>
                  <button className={classeStatus(analise.status)}>
                    <FaCircle />
                    <span>{nomeStatus(analise.status)}</span>
                  </button>
                  <button
                    className={estilos.detalhes}
                    onClick={() => {
                      setAnaliseSelecionada(analise);
                      setModoModal("detalhes");
                      setModalAberto(true);
                    }}
                  >
                    <span>Ver detalhes</span>
                  </button>
                </div>
              </div>
            ))}
            {!carregandoAnalises && analisesRecentes.length === 0 && (
              <div className={estilos.card}>
                <p>Nenhuma análise compartilhada ainda.</p>
              </div>
            )}

            <button
              type="button"
              className={estilos.botaoSecundario}
              onClick={() => desvincular(vinculoAtual.dispositivoCodigo)}
            >
              Remover código
            </button>
          </>
        )}

        {erro && <p className={estilos.mensagem}>{erro}</p>}
      </div>

      <ModalAnalises
        exibir={modalAberto}
        analises={analises}
        analiseSelecionada={analiseSelecionada}
        modo={modoModal}
        selecionarAnalise={(analise) => {
          setAnaliseSelecionada(analise);
        }}
        abrirDetalhes={() => setModoModal("detalhes")}
        ocultar={() => {
          setModalAberto(false);
          setAnaliseSelecionada(null);
        }}
      />
    </div>
  );
}