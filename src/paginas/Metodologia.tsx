import estilos from "./Metodologia.module.css";
import { FaWater } from "react-icons/fa6";

export function Metodologia() {
  return (
    <main className={estilos.conteiner}>
      <section className={estilos.secao}>
        <article className={estilos.informacoes}>
          <div className={estilos.titulo}>
            <FaWater className={estilos.icone} />

            <div>
              <h1>PH</h1>
              <span>Indicativo de acidez</span>
            </div>
          </div>

          <div className={estilos.linha}></div>

          <p>
            O sensor de pH é um dispositivo utilizado para medir o grau de
            acidez, neutralidade ou alcalinidade de uma solução aquosa. A escala
            de pH varia de 0 a 14, sendo que valores menores que 7 indicam
            soluções ácidas, iguais a 7 indicam soluções neutras e maiores que 7
            representam soluções básicas.
          </p>

          <p>
            Seu funcionamento é baseado em um eletrodo de vidro sensível aos
            íons hidrogênio (H⁺) presentes na água. Quando o eletrodo é imerso
            na solução, ocorre uma diferença de potencial elétrico entre o
            eletrodo de medição e o eletrodo de referência.
          </p>

          <p>
            O circuito eletrônico do módulo amplifica esse pequeno sinal
            elétrico e o envia ao Arduino como um sinal analógico. A partir
            desse valor, o microcontrolador realiza os cálculos necessários para
            determinar o pH da solução.
          </p>

          <p>
            Como a resposta do eletrodo sofre influência da temperatura e do
            desgaste natural do sensor, recomenda-se realizar calibrações
            periódicas utilizando soluções tampão de pH conhecido.
          </p>
        </article>

        <article className={estilos.classificacoes}>
          <div className={`${estilos.nivel} ${estilos.critico}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>0 - 3 de PH</h2>
              <p>
                Crítica! Pode causar corrosão e indicar contaminação química.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.atencao}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>4 - 6 de PH</h2>
              <p>
                Atenção! Fora da neutralidade, requer avaliação conforme a
                aplicação.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.ideal}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>7 de PH</h2>
              <p>Ideal! Faixa considerada neutra para água pura.</p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.boa}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>8 - 10 de PH</h2>
              <p>
                Boa! Comum em algumas águas naturais e processos industriais.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.critico}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>11 - 14 de PH</h2>
              <p>
                Crítica! Pode indicar elevada concentração de bases químicas.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
