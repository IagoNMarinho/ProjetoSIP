import estilos from "./Detectar.module.css";
import barco from "../assets/imagens/barco-cat.png";
import Status from "../componentes/detectar/Status";
import Feedback from "../componentes/detectar/Feedback";
import Fundo from "../componentes/detectar/Fundo";

export default function Detectar() {
  return (
    <main className={estilos.detectar}>
      <section className={estilos.expedicao}>
        <div className={estilos.nuvens} aria-hidden="true">
          <span className={estilos.nuvem} />
          <span className={estilos.nuvem} />
          <span className={estilos.nuvem} />
          <span className={estilos.nuvem} />
          <span className={estilos.nuvem} />
        </div>
        <img className={estilos.barco} src={barco} alt="Barco" />

        <div className={estilos.conteudo}>
          <h1>
            HORA DE
            <span className={estilos.destaque}>DETECTAR!</span>
          </h1>
          <p>
            Inicie seu monitoramento contínuo e garanta um consumo mais seguro!
          </p>
          <a href="#status">Explorar</a>
        </div>

        <svg
          className={estilos.ondas}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            className={estilos.onda1}
            d="M0,224L40,208C80,192,160,160,240,165.3C320,171,400,213,480,192C560,171,640,85,720,74.7C800,64,880,128,960,144C1040,160,1120,128,1200,112C1280,96,1360,96,1400,96L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
          <path
            className={estilos.onda2}
            d="M0,128L30,133.3C60,139,120,149,180,170.7C240,192,300,224,360,213.3C420,203,480,149,540,133.3C600,117,660,139,720,138.7C780,139,840,117,900,106.7C960,96,1020,96,1080,133.3C1140,171,1200,245,1260,234.7C1320,224,1380,128,1410,80L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
          <path
            className={estilos.onda3}
            d="M0,32L18.5,58.7C36.9,85,74,139,111,154.7C147.7,171,185,149,222,133.3C258.5,117,295,107,332,112C369.2,117,406,139,443,144C480,149,517,139,554,154.7C590.8,171,628,213,665,208C701.5,203,738,149,775,138.7C812.3,128,849,160,886,165.3C923.1,171,960,149,997,149.3C1033.8,149,1071,171,1108,197.3C1144.6,224,1182,256,1218,250.7C1255.4,245,1292,203,1329,197.3C1366.2,192,1403,224,1422,240L1440,256L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
          ></path>
        </svg>
      </section>
      <Fundo>
        <div id="status">
          <Status />
        </div>
        <div id="feedback">
          <Feedback />
        </div>
      </Fundo>
    </main>
  );
}

