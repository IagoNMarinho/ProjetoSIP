import { useEffect, useState } from "react";
import estilos from "./Toast.module.css";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import acerto from "../../../assets/imagens/logo.png"

type TipoToast = "sucesso" | "erro";

interface ToastProps {
  exibir: boolean;
  tipo: TipoToast;
  titulo: string;
  texto: string;
  aoFechar: () => void;
  duracao?: number; // tempo visível, em ms
}
const duracao_anima = 250; 

export function Toast({
  exibir,
  tipo,
  titulo,
  texto,
  aoFechar,
  duracao = 3000,
}: ToastProps) {
  const [montado, setMontado] = useState(exibir);
  const [saindo, setSaindo] = useState(false);

  // Controla quando o toast aparece e quando começa a sair
  useEffect(() => {
    if (exibir) {
      setMontado(true);
      setSaindo(false);

      const timer = setTimeout(() => {
        setSaindo(true); // inicia a animação de saída
      }, duracao);
      return () => clearTimeout(timer);
    }
  }, [exibir, duracao]);

  // Só remove do DOM depois que a animação de saída terminar
  useEffect(() => {
    if (!saindo) return;

    const timer = setTimeout(() => {
      setMontado(false);
      aoFechar();
    }, duracao_anima);

    return () => clearTimeout(timer);
  }, [saindo, aoFechar]);

  if (!montado) return null;

  return (
    <div
      className={`${estilos.toast} ${estilos[tipo]} ${saindo ? estilos.saindo : ""}`}
    >
      <div className={estilos.icone}>
        {tipo === "sucesso" ? <IoCheckmarkCircle/>: <IoCloseCircle />}
        {/* {tipo === "sucesso" ? <img src={acerto} alt="sucesso" className={estilos.iconeImagem} /> : <IoCloseCircle />} opcao com imagem*/} 
      </div>
      <div className={estilos.conteudo}>
        <strong className={estilos.titulo}>{titulo}</strong>
        <p className={estilos.texto}>{texto}</p>
      </div>
    </div>
  );
}
