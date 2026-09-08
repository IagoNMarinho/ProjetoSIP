import { Navigate } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AutenticacaoContexto } from "../contextos/AutenticacaoContexto";

interface RotaProtegidaProps {
  children: ReactNode;
}

export function RotaProtegida({ children }: RotaProtegidaProps) {
  const { usuarioContexto, carregandoAutenticacaoContexto } =
    useContext(AutenticacaoContexto);

  // Enquanto o Firebase verifica se existe uma sessão salva
  if (carregandoAutenticacaoContexto) {
    return <div>Carregando segurança...</div>;
  }

  // Se não houver usuário autenticado, volta para o login
  if (!usuarioContexto) {
    return <Navigate to="/" replace />;
  }

  // Usuário autenticado: permite acesso à página
  return children;
}
