import estilos from "./Metodologia.module.css";
import { FaWater } from "react-icons/fa6";

import { useState } from "react";
import { ModalMensagem } from "../componentes/ModalMensagem";

export function Metodologia() {
  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false);
  const [modalMensagemTexto, setMensagemTexto] = useState("");
  const [modalMensagemTitulo, setMensagemTitulo] = useState("");

  const exibirModal = () => setModalMensagemVisivel(true);
  const ocultarModal = () => {
    setModalMensagemVisivel(false);
  };

  function abrirDetalhes(titulo: string, texto: string) {
    setMensagemTexto(texto);
    setMensagemTitulo(titulo);
    setModalMensagemVisivel(true);
  }

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

      <section className={estilos.secao}>
        <article className={estilos.informacoes}>
          <div className={estilos.titulo}>
            <FaWater className={estilos.icone} />

            <div>
              <h1>Turbidez</h1>
              <span>
                Indicativo de partículas em suspensão presentes na água
              </span>
            </div>
          </div>

          <div className={estilos.linha}></div>

          <p>
            O sensor de turbidez é um dispositivo utilizado para medir o grau de
            transparência ou opacidade de um líquido, indicando a quantidade de
            partículas em suspensão presentes na água, como argila, areia,
            sedimentos, matéria orgânica, algas e outros resíduos. Quanto maior
            a concentração dessas partículas, maior será a turbidez da água.
          </p>

          <p>
            Seu funcionamento é baseado em um sistema óptico, composto por um
            LED emissor de luz e um fototransistor receptor. O LED emite um
            feixe luminoso que atravessa a amostra de água. Em águas limpas, a
            luz atravessa o líquido com pouca dispersão e uma maior quantidade
            de luz alcança o receptor. Já em águas turvas, as partículas
            suspensas espalham e bloqueiam parte da luz (fenômeno conhecido como
            Efeito Tyndall), fazendo com que uma menor intensidade luminosa seja
            detectada pelo fototransistor.
          </p>

          <p>
            A partir da intensidade de luz recebida, o circuito eletrônico gera
            um sinal elétrico proporcional ao nível de turbidez. Esse sinal pode
            ser convertido para a unidade NTU (Nephelometric Turbidity Unit),
            amplamente utilizada para expressar a turbidez da água. Dessa forma,
            quanto maior o valor em NTU, maior é a quantidade de partículas
            suspensas presentes na amostra.
          </p>

          <p>
            Como a resposta do eletrodo sofre influência da temperatura e do
            desgaste natural do sensor, recomenda-se realizar calibrações
            periódicas utilizando soluções tampão de pH conhecido.
          </p>
        </article>

        <article className={estilos.classificacoes}>
          <div className={`${estilos.nivel} ${estilos.ideal}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>0 – 5 NTU</h2>
              <p>
                Excelente! Água visualmente limpa, com poucas partículas
                suspensas.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.ideal}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>5 – 25 NTU</h2>
              <p>Boa! Pequena quantidade de partículas em suspensão.</p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.atencao}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>25 – 100 NTU</h2>
              <p>
                Atenção! Presença significativa de sedimentos ou matéria
                orgânica.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.critico}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>100 – 1000 NTU</h2>
              <p>Ruim! Água bastante turva, dificultando a passagem da luz.</p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.critico}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2> 1000 NTU</h2>
              <p>
                Crítica! Elevada concentração de partículas suspensas, indicando
                necessidade de tratamento.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className={estilos.secao}>
        <article className={estilos.informacoes}>
          <div className={estilos.titulo}>
            <FaWater className={estilos.icone} />

            <div>
              <h1>TDS</h1>
              <span>Indicativo de Total de Sólidos Dissolvidos</span>
            </div>
          </div>

          <div className={estilos.linha}></div>

          <p>
            O sensor de TDS funciona medindo a condutividade elétrica (CE) da
            água por meio de dois eletrodos imersos no líquido. Quanto maior a
            concentração de íons dissolvidos, como sais minerais, maior será a
            condutividade elétrica. A partir desse valor, o circuito estima a
            concentração de sólidos dissolvidos, expressa em ppm (partes por
            milhão).
          </p>

          <p>
            Águas com menor concentração de sólidos dissolvidos apresentam baixa
            condutividade e valores reduzidos de TDS, enquanto valores elevados
            podem estar relacionados ao aumento de sais minerais, metais
            dissolvidos, resíduos ou outros compostos iônicos presentes na água.
            É importante destacar que o sensor de TDS não identifica quais
            substâncias estão presentes nem determina diretamente a potabilidade
            da água. Dessa forma, alterações significativas nos valores podem
            servir como um alerta para mudanças na composição da água, indicando
            a necessidade de análises mais específicas para identificar
            possíveis contaminantes.
          </p>
        </article>

        <article className={estilos.classificacoes}>
          <div className={`${estilos.nivel} ${estilos.critico}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>0 - 250 ppm</h2>
              <p>
                Não próprio para consumo! Faltam alguns minerais benéficos para
                a saúde.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.ideal}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>300 ppm - 500 ppm</h2>
              <p>Boa! Pequena quantidade de partículas em suspensão.</p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.atencao}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2>600 ppm - 900 ppm</h2>
              <p>
                Inaceitável! A água deve ser purificada utilizando purificadores
                de osmose reversa.
              </p>
            </div>
          </div>

          <div className={`${estilos.nivel} ${estilos.boa}`}>
            <span className={estilos.circulo}></span>

            <div>
              <h2> 1000 ppm</h2>
              <p>Inseguro! A água pode ter efeitos adversos para a saúde.</p>
            </div>
          </div>
        </article>
      </section>
      <section className={estilos.secao3}>
        <article className={estilos.informacoes}>
          <div className={estilos.titulo}>
            <FaWater className={estilos.icone} />

            <div>
              <h1>Temperatura</h1>
              <span>Indicativo de temperatura</span>
            </div>
          </div>

          <div className={estilos.linha}></div>

          <p>
            O DS18B20 é um sensor digital utilizado para medir a temperatura de
            líquidos, ambientes e superfícies. Seu funcionamento é baseado em um
            elemento sensor interno de silício, que detecta a variação da
            temperatura e a converte diretamente em um valor digital. Esse valor
            é enviado ao microcontrolador por meio do protocolo de comunicação
            1-Wire, permitindo que apenas um fio de dados seja utilizado para a
            transmissão das informações.
          </p>

          <p>
            O sensor possui uma faixa de medição de -55 °C a +125 °C, com margem
            de erro de aproximadamente ±0,5 °C, oferecendo alta precisão para
            aplicações de monitoramento. Além disso, cada DS18B20 possui um
            identificador único de 64 bits, possibilitando a conexão de vários
            sensores no mesmo pino digital do Arduino sem que haja conflito
            entre as leituras.
          </p>

          <p>
            A temperatura exerce influência sobre diversas propriedades físicas
            e químicas da água, podendo afetar diretamente a precisão das
            medições realizadas por sensores de qualidade da água. Dessa forma,
            recomenda-se que o sensor de temperatura seja utilizado em conjunto
            com sensores de TDS, pH e turbidez, permitindo a compensação de
            variações térmicas e proporcionando resultados mais confiáveis.
          </p>
        </article>
        <section className={estilos.secao2}>
          <article className={estilos.card2}>
            <h2>Influência para PH</h2>
            <div className={estilos.linha}></div>

            <p>
              A temperatura altera a resposta eletroquímica do eletrodo, sendo
              recomendada a compensação automática.
            </p>

            <button
              onClick={() =>
                abrirDetalhes(
                  "Temperatura para PH",
                  "A temperatura interfere nas medições de pH. Embora não altere diretamente a concentração de íons hidrogênio presentes na solução, ela modifica a resposta eletroquímica do eletrodo de vidro utilizado pelos sensores. Além disso, o aumento da temperatura pode intensificar determinadas reações químicas presentes na água, ocasionando pequenas variações no valor do pH. Por esse motivo, sensores modernos também utilizam compensação automática de temperatura para aumentar a precisão das medições.",
                )
              }
            >
              ver detalhes
            </button>
          </article>

          <article className={estilos.card2}>
            <h2>Influência para TDS</h2>
            <div className={estilos.linha}></div>

            <p>
              Sofre influência direta da temperatura devido à variação da
              condutividade elétrica. Utiliza compensação automática (ATC).
            </p>

            <button
              onClick={() =>
                abrirDetalhes(
                  "Temperatura para TDS",
                  "No sensor de TDS, o aumento da temperatura provoca um crescimento natural da condutividade elétrica da água. Assim, uma mesma amostra analisada a 35 °C apresenta maior condutividade do que quando medida a 20 °C, mesmo sem alteração na concentração de sólidos dissolvidos. Para minimizar esse efeito, muitos sensores empregam a Compensação Automática de Temperatura (Automatic Temperature Compensation – ATC), corrigindo os valores obtidos para uma temperatura de referência, geralmente 25 °C.",
                )
              }
            >
              ver detalhes
            </button>
          </article>

          <article className={estilos.card2}>
            <h2>Influência para Turbidez</h2>
            <div className={estilos.linha}></div>

            <p>
              Não sofre influência significativa da temperatura, pois seu
              funcionamento é baseado em princípios ópticos.
            </p>

            <button
              onClick={() =>
                abrirDetalhes(
                  "Temperatura para Turbidez",
                  "Em relação ao sensor de turbidez, a influência da temperatura é praticamente inexistente, uma vez que seu princípio de funcionamento baseia-se na dispersão e transmissão da luz pelas partículas suspensas na água, e não em propriedades elétricas ou químicas.",
                )
              }
            >
              ver detalhes
            </button>
          </article>
        </section>
      </section>

      <ModalMensagem
        exibir={modalMensagemVisivel}
        ocultar={() => ocultarModal()}
        titulo={modalMensagemTitulo}
        texto={modalMensagemTexto}
      />
    </main>
  );
}
