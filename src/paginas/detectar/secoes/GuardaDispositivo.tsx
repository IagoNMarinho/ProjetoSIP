import type { ReactNode } from "react";
import { useDispositivoContexto } from "../../../contextos/DispositivoContexto";
import estilos from "./GuardaDispositivo.module.css";

interface GuardaDispositivoProps {
  children: ReactNode;
  aoInformarCodigo: () => void;
}

export function GuardaDispositivo({
  children,
  aoInformarCodigo,
}: GuardaDispositivoProps) {
  const { permitido, permissaoCarregada } = useDispositivoContexto();

  //espera descobrir se o usuario tem acesso, para nao piscar o aviso
  if (!permissaoCarregada) return null;

  //sem codigo ativo: avisa e oferece o botao que abre o modal
  if (!permitido) {
    return (
      <div className={estilos.aviso}>
        <h2>Nenhum dispositivo conectado</h2>
        <p>Informe o código de ativação do seu dispositivo para monitorar e controlar o coletor.</p>
        <button className={estilos.botao} onClick={aoInformarCodigo}>
          Informar código
        </button>
      </div>
    );
  }

  return <>{children}</>;
}