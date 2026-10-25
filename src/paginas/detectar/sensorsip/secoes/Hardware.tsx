import estilos from "./Hardware.module.css";
import { useHardware, type StatusSensor } from "../../../../hooks/useHardware"

type EstadoHardwareProps = {
  id?: string;
};

//textos e estilos de cada status de sensor
const rotuloStatus: Record<StatusSensor, string> = {
  funcionando: "Funcionando",
  "sem-leitura": "Sem leitura",
  pausado: "Pausado",
  "sem-sinal": "Sem sinal",
};

function formatarDataHora(data: Date | null) {
  if (!data) return "—";
  const dia = data.toLocaleDateString("pt-BR");
  const hora = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dia} — ${hora}`;
}

function formatarDuracao(ms: number | null) {
  if (ms === null || ms < 0) return "—";
  const minutosTotais = Math.floor(ms / 60000);
  const horas = Math.floor(minutosTotais / 60);
  const minutos = minutosTotais % 60;
  return horas > 0 ? `${horas}h ${minutos}min` : `${minutos}min`;
}

export function EstadoHardware({ id }: EstadoHardwareProps) {
  const hw = useHardware();

  const textoConexao = hw.carregando
    ? "Verificando..."
    : hw.semDispositivo
      ? "Sem dispositivo"
      : hw.conectado
        ? "Conectado"
        : "Desconectado";

  const classeStatusSensor = (status: StatusSensor) => {
    if (status === "funcionando") return estilos.statusFuncionando;
    if (status === "sem-sinal") return estilos.statusInativo;
    return estilos.statusAlerta;
  };

  return (
    <main id={id} className={estilos.conteiner}>
      <section className={estilos.cabecalho}>
        <h2 className={estilos.titulo}>estado do Hardware</h2>
        <span
          className={`${estilos.badge} ${
            hw.conectado ? estilos.badgeConectado : estilos.badgeDesconectado
          }`}
        >
          <span
            className={`${estilos.ponto} ${hw.conectado ? estilos.pontoConectado : estilos.pontoDesconectado}`}
          ></span>
          {textoConexao}
        </span>
      </section>

      <section className={estilos.linha}>
        <div className={estilos.card}>
          <p className={estilos.rotulo}>Conexão</p>

          <div className={estilos.statusConexao}>
            <span
              className={`${estilos.ponto} ${hw.conectado ? estilos.pontoConectado : estilos.pontoDesconectado}`}
            ></span>
            <strong>{textoConexao}</strong>
          </div>

          <div className={estilos.detalhes}>
            <div className={estilos.detalheLinha}>
              <span>Última conexão</span>
              <span>{formatarDataHora(hw.ultimoContato)}</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Tempo conectado</span>
              <span>{formatarDuracao(hw.tempoConectadoMs)}</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Dispositivo</span>
              <span>{hw.codigo ?? "—"}</span>
            </div>
          </div>
        </div>

        <div className={estilos.card}>
          <p className={estilos.rotulo}>Funcionamento</p>
          {hw.semDispositivo ? (
            <p className={estilos.textoSecundario}>
              Nenhum dispositivo vinculado a esta conta.
            </p>
          ) : hw.falhas.length === 0 ? (
            <p className={estilos.textoSecundario}>
              Nenhuma falha registrada na última leitura
            </p>
          ) : (
            hw.falhas.map((falha) => (
              <p key={falha} className={estilos.textoSecundario}>
                {falha}
              </p>
            ))
          )}
        </div>
      </section>

      <section className={estilos.cardSensores}>
        <div className={estilos.cabecalhoSensores}>
          <p className={estilos.rotulo2}>Sensores</p>
          <span className={estilos.contador}>
            {hw.sensoresFuncionando}/{hw.totalSensores}
          </span>
        </div>

        <div className={estilos.gradeSensores}>
          {hw.sensores.map((sensor) => (
            <div className={estilos.sensorItem} key={sensor.chave}>
              <span>{sensor.nome}</span>
              <span className={classeStatusSensor(sensor.status)}>
                <span className={estilos.ponto}></span>
                {rotuloStatus[sensor.status]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={estilos.linha}>
        <div className={`${estilos.card} ${estilos.cardUnico}`}>
          <p className={estilos.rotulo}>Dados do dispositivo</p>

          <div className={estilos.detalhes}>
            <div className={estilos.detalheLinha}>
              <span>Nome</span>
              <span>{hw.nome ?? (hw.codigo ? `Dispositivo ${hw.codigo}` : "—")}</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>ID</span>
              <span>{hw.codigo ?? "—"}</span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Monitoramento</span>
              <span>
                {hw.semDispositivo || hw.carregando
                  ? "—"
                  : hw.monitorando
                    ? "Ativo"
                    : "Pausado"}
              </span>
            </div>
            <div className={estilos.detalheLinha}>
              <span>Sincronização</span>
              <span>{formatarDataHora(hw.ultimaLeitura)}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}