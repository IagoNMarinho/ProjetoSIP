import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { LuX } from "react-icons/lu";
import { useDispositivoContexto } from "../../../contextos/DispositivoContexto";
import estilos from "./AtivarCodigo.module.css";

interface AtivarCodigoProps {
  ocultar: () => void;
}

export function AtivarCodigo({ ocultar }: AtivarCodigoProps) {
  const { ativarCodigo } = useDispositivoContexto();
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  //fecha com a tecla Esc
  useEffect(() => {
    const aoApertar = (e: KeyboardEvent) => {
      if (e.key === "Escape") ocultar();
    };
    window.addEventListener("keydown", aoApertar);
    return () => window.removeEventListener("keydown", aoApertar);
  }, [ocultar]);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setMensagem("");
    const retorno = await ativarCodigo(codigo.trim().toUpperCase());
    //em caso de sucesso o hook libera o acesso sozinho e o Detectar fecha o modal
    if (retorno !== "sucesso") {
      setMensagem(retorno);
      setEnviando(false);
    }
  };

  return (
     <div
      className={estilos.fundo}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) ocultar();
      }}
    >
        <div
            className={estilos.conteiner}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-codigo"
        >
            <div className={estilos.cabecalho}>
            <h2 id="titulo-codigo">Código de acesso</h2>
            <button
                type="button"
                className={estilos.fechar}
                onClick={ocultar}
                aria-label="Fechar"
            >
                <LuX />
            </button>
            </div>

            <form className={estilos.formulario} onSubmit={enviar}>
            <p className={estilos.texto}>
              Para monitorar e controlar um dispositivo, digite o código de
              ativação dele.
            </p>

            <div className={estilos.campo}>
                <label className={estilos.rotulo} htmlFor="codigo-acesso">
                Código
                </label>
                <input
                id="codigo-acesso"
                className={estilos.input}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="Digite o código"
                maxLength={8}
                autoComplete="off"
                autoFocus
                />
                {mensagem && <p className={estilos.mensagem}>{mensagem}</p>}
            </div>

            <div className={estilos.acoes}>
                <button
                    type="button"
                    className={`${estilos.botao} ${estilos.botaoSecundario}`}
                    onClick={ocultar}
                >
                Cancelar
                </button>
                <button
                    type="submit"
                    className={estilos.botao}
                    disabled={enviando || codigo.trim().length !== 8}
                >
                    {enviando ? "Verificando..." : "Ativar"}
                </button>
            </div>
            </form>
        </div>
        </div>
  );
}