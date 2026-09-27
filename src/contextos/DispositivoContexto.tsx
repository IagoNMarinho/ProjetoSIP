import { createContext, useContext, type ReactNode } from "react";
import { useDispositivo } from "../hooks/useDispositivo";

type DispositivoContextoTipo = ReturnType<typeof useDispositivo>;

const DispositivoContexto = createContext<DispositivoContextoTipo | null>(null);

export function DispositivoProvider({ children }: { children: ReactNode }) {
  //chama o hook uma unica vez aqui, todos os componentes abaixo compartilham o mesmo estado
  const dispositivo = useDispositivo();

  return (
    <DispositivoContexto.Provider value={dispositivo}>
      {children}
    </DispositivoContexto.Provider>
  );
}

export function useDispositivoContexto() {
  const contexto = useContext(DispositivoContexto);
  if (!contexto) {
    throw new Error(
      "useDispositivoContexto precisa ser usado dentro de um DispositivoProvider",
    );
  }
  return contexto;
}