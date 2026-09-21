import estilos from "./SensorInfo.module.css";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

type SensorInfo = {
  id?: string;
};

export function SensorInfo({ id }: SensorInfo) {
  const [itemAberto, setItemAberto] = useState<number | null>(0);

  function alternarItem(indice: number) {
    setItemAberto((itemAnterior) => (itemAnterior === indice ? null : indice));
  }

  return (
    <main id={id} className={estilos.conteiner}>
      <h2 className={estilos.titulo}>Sensor Sip</h2>

      <div className={estilos.grupoPaineis}>
        <div className={estilos.painel}>
          <div className={estilos.painelCabecalho}>
            <button
              type="button"
              className={estilos.painelTitulo}
              onClick={() => alternarItem(0)}
            >
              O que é o sensor sip?
              <span
                className={`${estilos.seta} ${itemAberto === 0 ? estilos.setaAberta : ""}`}
              >
                <FaAngleUp />
              </span>
            </button>
          </div>

          <div
            className={`${estilos.painelColapso} ${itemAberto === 0 ? estilos.painelColapsoAberto : ""}`}
          >
            <div className={estilos.painelCorpo}>
              O Sensor SIP é o dispositivo físico desenvolvido como parte do
              projeto SIP, responsável por compor a estrutura necessária para a
              realização do monitoramento da qualidade da água. Ele reúne, em um
              único equipamento, diferentes componentes eletrônicos e sensores
              destinados à obtenção dos parâmetros utilizados nas análises.
            </div>
          </div>
        </div>

        <div className={estilos.painel}>
          <div className={estilos.painelCabecalho}>
            <button
              type="button"
              className={estilos.painelTitulo}
              onClick={() => alternarItem(1)}
            >
              Voce já sabe como funciona o sensor sip?
              <span
                className={`${estilos.seta} ${itemAberto === 1 ? estilos.setaAberta : ""}`}
              >
                <FaAngleUp />
              </span>
            </button>
          </div>

          <div
            className={`${estilos.painelColapso} ${itemAberto === 1 ? estilos.painelColapsoAberto : ""}`}
          >
            <div className={estilos.painelCorpo}>
              O dispositivo é constituído por uma unidade de processamento,
              responsável pelo gerenciamento dos componentes, além de sensores
              específicos para a análise de características da água, como pH,
              temperatura, turbidez e sólidos dissolvidos (TDS). Esses elementos
              trabalham em conjunto e fazem parte da estrutura física
              responsável pela coleta dos dados utilizados pelo sistema SIP.
              Dessa forma, o Sensor SIP representa a parte física do projeto,
              complementando a plataforma digital e possibilitando a integração
              entre o equipamento e o sistema de monitoramento.
            </div>
          </div>
        </div>

        <div className={estilos.painel}>
          <div className={estilos.painelCabecalho}>
            <button
              type="button"
              className={estilos.painelTitulo}
              onClick={() => alternarItem(2)}
            >
              Qual metodologia utilizamos?
              <span
                className={`${estilos.seta} ${itemAberto === 2 ? estilos.setaAberta : ""}`}
              >
                <FaAngleUp />
              </span>
            </button>
          </div>

          <div
            className={`${estilos.painelColapso} ${itemAberto === 2 ? estilos.painelColapsoAberto : ""}`}
          >
            <div className={estilos.painelCorpo}>
              Por meio de artigos científicos, possuímos parâmetros condicionais para avaliar a qualidade da água!{" "}
              <Link to="/metodologia" className={estilos.link}>
                Saiba mais!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
