import { useState } from "react";
import { useCodigoAcesso } from "../../../hooks/useCodigoAcesso";
import { Confirmar } from "../confirmar/Confirmar";
import estilos from "./CodigoAcessoInstituicao.module.css";

export function CodigoAcessoInstituicao() {
  const { codigoAcesso, carregando, gerando, erro, gerarNovoCodigo } =
    useCodigoAcesso();
  const [copiado, setCopiado] = useState(false);
  const [confirmarAberto, setConfirmarAberto] = useState(false);

  const copiar = async () => {
    if (!codigoAcesso) return;
    await navigator.clipboard.writeText(codigoAcesso);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const gerar = () => {
    //trocar o codigo remove o acesso de quem usava o anterior, entao pede confirmacao
    if (codigoAcesso) {
      setConfirmarAberto(true);
      return;
    }
    gerarNovoCodigo();
  };

  const confirmarTroca = () => {
    setConfirmarAberto(false);
    gerarNovoCodigo();
  };

  if (carregando) return null;

  return (
    <div className={estilos.caixa}>
      <h3 className={estilos.titulo}>Código de acesso</h3>
      <p className={estilos.texto}>
        Compartilhe este código com quem deve visualizar as análises da
        instituição. Ele não permite controlar o dispositivo.
      </p>

      {codigoAcesso && <p className={estilos.codigo}>{codigoAcesso}</p>}

      <div className={estilos.acoes}>
        {codigoAcesso && (
          <button
            type="button"
            className={`${estilos.botao} ${estilos.botaoSecundario}`}
            onClick={copiar}
          >
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        )}
        <button
          type="button"
          className={estilos.botao}
          onClick={gerar}
          disabled={gerando}
        >
          {gerando
            ? "Gerando..."
            : codigoAcesso
              ? "Gerar novo código"
              : "Gerar código"}
        </button>
      </div>

      {erro && <p className={estilos.mensagem}>{erro}</p>}

      <Confirmar
        exibir={confirmarAberto}
        ocultar={() => setConfirmarAberto(false)}
        titulo="Gerar novo código"
        texto="Gerar um novo código remove o acesso de quem usa o código atual. Continuar?"
        aoConfirmar={confirmarTroca}
      />
    </div>
  );
}