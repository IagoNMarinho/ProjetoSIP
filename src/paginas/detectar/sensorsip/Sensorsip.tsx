import { useState, useEffect } from "react";
import estilos from "./Sensorsip.module.css";
import { EstadoHardware } from "./secoes/Hardware";
import { SensorInfo } from "./secoes/SensorInfo";
import { Aquisicao } from "./secoes/Aquisicao";

import imagemEsp32 from "../../../assets/imagens/esp32.webp";
import imagemPh from "../../../assets/imagens/sensor-de-ph.jpg";
import imagemTurbidez from "../../../assets/imagens/Sensor-de-turbidez.png";
import imagemTds from "../../../assets/imagens/medidor-de-tds-sensor.jpg";
import imagemTemperatura from "../../../assets/imagens/sensor-de-temperatura-ds18b20.jpg";

const QUANTIDADE_ITENS = 5;
const INTERVALO = 5000;

export function Sensorsip() {
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual(
        (indiceAnterior) => (indiceAnterior + 1) % QUANTIDADE_ITENS,
      );
    }, INTERVALO);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className={estilos.alinhamento}>
        <main className={estilos.conteiner}>
        <section className={estilos.pt1}>
            <div className={estilos.titulo}>
            <h2>Conheça o</h2>
            <h1>Sensor Sip</h1>
            </div>
            <h3>
            Página dedicada à apresentação e às especificações do hardware
            utilizado no projeto SIP: o Sensor SIP. Aqui você poderá estar por
            dentro de informações sobre sua composição, funcionamento, sensores
            integrados, conectividade e recursos de gerenciamento e manutenção do
            dispositivo.
            </h3>

            <nav className={estilos.lista}>
            <a href="#topico-1" className={estilos.item}>
                <span className={estilos.numero}>1</span>
                <span>Estado do Hardware</span>
            </a>

            <a href="#topico-2" className={estilos.item}>
                <span className={estilos.numero}>2</span>
                <span>Como funciona?</span>
            </a>

            <a href="#topico-3" className={estilos.item}>
                <span className={estilos.numero}>3</span>
                <span>Aquisição</span>
            </a>

            </nav>
        </section>

        <section className={estilos.pt2}>
            <div className={estilos.carousel}>
            <div
                className={`${estilos.carouselItem} ${indiceAtual === 0 ? estilos.carouselItemAtivo : ""}`}
            >
                <img
                src={imagemEsp32}
                alt="ESP32"
                className={estilos.carouselImagem}
                />
                <div className={estilos.carouselCaption}>
                <h5>ESP32</h5>
                <p>
                    Microcontrolador responsável pelo processamento e conectividade
                    do dispositivo.
                </p>
                </div>
            </div>

            <div
                className={`${estilos.carouselItem} ${indiceAtual === 1 ? estilos.carouselItemAtivo : ""}`}
            >
                <img src={imagemPh} alt="PH" className={estilos.carouselImagem} />
                <div className={estilos.carouselCaption}>
                <h5>PH</h5>
                <p>Mede o nível de acidez ou alcalinidade da água.</p>
                </div>
            </div>

            <div
                className={`${estilos.carouselItem} ${indiceAtual === 2 ? estilos.carouselItemAtivo : ""}`}
            >
                <img
                src={imagemTurbidez}
                alt="Turbidez"
                className={estilos.carouselImagem}
                />
                <div className={estilos.carouselCaption}>
                <h5>Turbidez</h5>
                <p>
                    Detecta partículas em suspensão que indicam a limpidez da água.
                </p>
                </div>
            </div>

            <div className={`${estilos.carouselItem} ${indiceAtual === 3 ? estilos.carouselItemAtivo : ""}`}>
                <img src={imagemTds} alt="TDS" className={estilos.carouselImagem} />
                <div className={estilos.carouselCaption}>
                <h5>TDS</h5>
                <p>Mede a concentração de sólidos totais dissolvidos na água.</p>
                </div>
            </div>

            <div className={`${estilos.carouselItem} ${indiceAtual === 4 ? estilos.carouselItemAtivo : ""}`}>
                <img
                src={imagemTemperatura}
                alt="Temperatura"
                className={estilos.carouselImagem}
                />
                <div className={estilos.carouselCaption}>
                <h5>Temperatura</h5>
                <p>Monitora a temperatura da água em tempo real.</p>
                </div>
            </div>

            <ul className={estilos.indicadores}>
                {Array.from({ length: QUANTIDADE_ITENS }).map((_, indice) => (
                <li key={indice}>
                    <button
                    type="button"
                    aria-label={`Mostrar item ${indice + 1}`}
                    aria-current={indice === indiceAtual}
                    className={`${estilos.indicador} ${indice === indiceAtual ? estilos.indicadorAtivo : ""}`}
                    onClick={() => setIndiceAtual(indice)}
                    />
                </li>
                ))}
            </ul>
            </div>
        </section>
        </main>
        <EstadoHardware id="topico-1"/>
        <SensorInfo id="topico-2"/>
        <Aquisicao id="topico-3"/>
    </main>
  );
}
