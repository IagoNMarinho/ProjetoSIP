import estilos from "./Aquisicao.module.css";
import { Link } from "react-router-dom";

import imagemGato from "../../../../assets/imagens/logo.jpeg";

type AquisicaoProps = {
  id?: string;
};

export function Aquisicao({ id }: AquisicaoProps) {
  return (
    <main id={id} className={estilos.conteiner}>
      <div className={estilos.texto}>
        <h2 className={estilos.titulo}>Aquisição do Sensor SIP</h2>
        <p className={estilos.descricao}>
          Leve o sensor SIP para a sua instituição ou residência! Entre em
          contato conosco e adquira o seu!
        </p>

        <Link to="/contato" className={estilos.botao}>
          Entre em contato conosco!
        </Link>
      </div>

      <img
        src={imagemGato}
        alt="Ilustração de aquisição do Sensor SIP"
        className={estilos.imagem}
      />
    </main>
  );
}