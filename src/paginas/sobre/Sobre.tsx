
import { useNavigate } from "react-router-dom";
import estilos from "./Sobre.module.css";

export function Sobre() {
  const navigate = useNavigate();

  const secoes = [
    {
      titulo: "PROJETO",
      descricao: "Conheça os objetivos e a proposta do projeto.",
      rota: "/projeto",
      simbolo: "➜",
    },
    {
      titulo: "METODOLOGIA",
      descricao: "Descubra como o projeto foi desenvolvido.",
      rota: "/metodologia",
      simbolo: "⚙",
    },
    {
      titulo: "CONTATO",
      descricao: "Entre em contato para saber mais.",
      rota: "/contato",
      simbolo: "✉",
    },
  ];

  return (
    <main className={estilos.sobre}>
      <section className={estilos.conteudo}>
        <span className={estilos.etiqueta}>
          SAIBA MAIS
        </span>

        <h1 className={estilos.titulo}>
          SOBRE O PROJETO
        </h1>

        <p className={estilos.descricao}>
          Seja bem-vindo! Este espaço foi criado para apresentar
          nosso projeto, compartilhar as ideias que orientam seu
          desenvolvimento e mostrar os caminhos que seguimos para
          torná-lo realidade. Explore as seções abaixo para conhecer
          melhor nossa proposta, nossa metodologia e as formas de
          entrar em contato.
        </p>

        <div className={estilos.botoes}>
          {secoes.map((secao) => (
            <button
              key={secao.titulo}
              type="button"
              className={estilos.botao}
              onClick={() => navigate(secao.rota)}
            >
              <span
                className={estilos.icone}
                aria-hidden="true"
              >
                {secao.simbolo}
              </span>

              <span className={estilos.textos}>
                <span className={estilos.nome}>
                  {secao.titulo}
                </span>

                <span className={estilos.legenda}>
                  {secao.descricao}
                </span>
              </span>

              <span
                className={estilos.seta}
                aria-hidden="true"
              >
                →
              </span>
            </button>
          ))}
        </div>

        <p className={estilos.rodape}>
          EXPLORE • CONHEÇA • CONECTE-SE
        </p>
      </section>
    </main>
  );
}
