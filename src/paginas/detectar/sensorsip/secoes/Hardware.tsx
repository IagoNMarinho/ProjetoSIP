import estilos from "./Hardware.module.css";
import { useState } from "react";

type EstadoHardwareProps = {
  id?: string;
};

export function EstadoHardware({id}: EstadoHardwareProps) {
  const [conectado, setConectado] = useState(true);
  const [mensagemStatus, setMensagemStatus] = useState("");

  function reconectar() {
    setConectado(true);
    setMensagemStatus("dispositivo reconectado com sucesso");
  }

  function reiniciarDispositivo() {
    setConectado(false);
    setMensagemStatus("dispositivo reiniciado com sucesso");
  }

  return (
    <main id={id} className={estilos.conteiner}>
      <section className={estilos.cabecalho}>
        <h2 className={estilos.titulo}>estado do Hardware</h2>
        <span
          className={`${estilos.badge} ${
            conectado ? estilos.badgeConectado : estilos.badgeDesconectado
          }`}
        >
          <span
            className={`${estilos.ponto} ${conectado ? estilos.pontoConectado : estilos.pontoDesconectado}`}
          ></span>
          {conectado ? "Conectado" : "Desconectado"}
        </span>
      </section>

      <section className={estilos.linha}>
        <div className={estilos.card}>
          <p className={estilos.rotulo}>Conexão</p>

          <div className={estilos.statusConexao}>
            <span
              className={`${estilos.ponto} ${conectado ? estilos.pontoConectado : estilos.pontoDesconectado}`}
            ></span>
            <strong>{conectado ? "Conectado" : "Desconectado"}</strong>
          </div>

          <div className={estilos.detalhes}>
            <div className={estilos.detalheLinha}>
              <span>Última conexão</span>
              <span>05/09/2026 — 16:32</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Tempo conectado</span>
              <span>3h 20min</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Dispositivo</span>
              <span>codigo</span>
            </div>
          </div>
        </div>

        <div className={estilos.card}>
          <p className={estilos.rotulo}>Funcionamento</p>
          <p className={estilos.textoSecundario}>
            Nenhuma falha registrada na última leitura
          </p>
        </div>
      </section>

      <section className={estilos.cardSensores}>
        <div className={estilos.cabecalhoSensores}>
          <p className={estilos.rotulo}>Sensores</p>
          <span className={estilos.contador}>4/4</span>
        </div>

        <div className={estilos.gradeSensores}>
          <div className={estilos.sensorItem}>
            <span>Sensor PH</span>
            <span className={estilos.statusFuncionando}>
              <span className={estilos.ponto}></span>
              Funcionando
            </span>
          </div>

          <div className={estilos.sensorItem}>
            <span>Sensor TDS</span>
            <span className={estilos.statusFuncionando}>
              <span className={estilos.ponto}></span>
              Funcionando
            </span>
          </div>

          <div className={estilos.sensorItem}>
            <span>Sensor turbidez</span>
            <span className={estilos.statusFuncionando}>
              <span className={estilos.ponto}></span>
              Funcionando
            </span>
          </div>

          <div className={estilos.sensorItem}>
            <span>Sensor Temperatura</span>
            <span className={estilos.statusFuncionando}>
              <span className={estilos.ponto}></span>
              Funcionando
            </span>
          </div>
        </div>
      </section>

      <section className={estilos.linha}>
        <div className={estilos.card}>
          <p className={estilos.rotulo}>Gerenciamento</p>

          <div className={estilos.botoesGerenciamento}>
            <button className={estilos.botaoReconectar} onClick={reconectar}>
              Reconectar
            </button>
            <button
              className={estilos.botaoReiniciar}
              onClick={reiniciarDispositivo}
            >
              Reiniciar dispositivo
            </button>
          </div>

          {mensagemStatus && (
            <div className={estilos.mensagemStatus}>
              <span className={estilos.pontoBranco}></span>
              {mensagemStatus}
            </div>
          )}
        </div>

        <div className={estilos.card}>
          <p className={estilos.rotulo}>Dados do dispositivo</p>

          <div className={estilos.detalhes}>
            <div className={estilos.detalheLinha}>
              <span>Nome</span>
              <span>Sensor SIP-0001</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>ID</span>
              <span>0001</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Conexão</span>
              <span>ativo</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Sincronização</span>
              <span>05/09/2026 às 18h 02</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}