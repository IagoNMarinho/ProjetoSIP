import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  autenticacao,
  bancoDados,
  bancoTempoReal,
} from "../firebase/FirebaseConexao";
import { parseHoraTexto } from "./useDispositivo";

const limite_offline_ms = 25000; // 2 envios perdidos

export type StatusSensor =
  | "funcionando"
  | "sem-leitura"
  | "pausado"
  | "sem-sinal";

export interface SensorHardware {
  chave: "ph" | "tds" | "turbidez" | "temp";
  nome: string;
  status: StatusSensor;
  valor: number | null;
}

interface DispositivoVinculado {
  codigo: string;
  caminhoSensor: string;
  nome: string | null;
}

//limites que uma leitura precisa respeitar para ser considerada valida
const leituraValida: Record<SensorHardware["chave"], (v: number) => boolean> = {
  ph: (v) => v >= 0 && v <= 14,
  tds: (v) => v >= 0,
  turbidez: (v) => v >= 0,
  temp: (v) => v > -50 && v < 125,
};

function lerNumero(valor: unknown): number | null {
  return typeof valor === "number" && Number.isFinite(valor) ? valor : null;
}

function calcularStatus(
  chave: SensorHardware["chave"],
  valor: number | null,
  online: boolean,
  monitorando: boolean,
): StatusSensor {
  if (!online) return "sem-sinal";
  if (!monitorando) return "pausado";
  return valor !== null && leituraValida[chave](valor)
    ? "funcionando"
    : "sem-leitura";
}

export function useHardware() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [dispositivo, setDispositivo] = useState<DispositivoVinculado | null>(
    null,
  );
  const [dispositivoCarregado, setDispositivoCarregado] = useState(false);
  const [dados, setDados] = useState<Record<string, any> | null>(null);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [agora, setAgora] = useState(Date.now());

  useEffect(() => {
    const cancelar = onAuthStateChanged(autenticacao, (usuario) => {
      setUsuarioId(usuario?.uid ?? null);
    });
    return () => cancelar();
  }, []);

  //acha o dispositivo do usuario logado (instituicao ou usuario comum)
  useEffect(() => {
    if (!usuarioId) {
      setDispositivo(null);
      setDispositivoCarregado(false);
      return;
    }

    const cancelar = onSnapshot(
      query(
        collection(bancoDados, "dispositivos"),
        where("donoId", "==", usuarioId),
      ),
      (resultado) => {
        const encontrado = resultado.docs.find((d) => d.data().ativo !== false);
        setDispositivo(
          encontrado
            ? {
                codigo: encontrado.id,
                caminhoSensor:
                  encontrado.data().caminhoSensor ??
                  `sensores/${encontrado.id}`,
                nome: encontrado.data().nome ?? null,
              }
            : null,
        );
        setDispositivoCarregado(true);
      },
      (e) => {
        setErro(e.message);
        setDispositivoCarregado(true);
      },
    );

    return () => cancelar();
  }, [usuarioId]);

  const caminhoSensor = dispositivo?.caminhoSensor ?? null;

  //escuta o nó do dispositivo em tempo real e usa um relogio para reavaliar online/offline
  useEffect(() => {
    if (!caminhoSensor) {
      setDados(null);
      setDadosCarregados(false);
      return;
    }
    setDadosCarregados(false);

    const cancelar = onValue(
      ref(bancoTempoReal, caminhoSensor),
      (snapshot) => {
        setDados(snapshot.val());
        setDadosCarregados(true);
      },
      (e) => {
        setErro(e.message);
        setDadosCarregados(true);
      },
    );

    const intervalo = setInterval(() => setAgora(Date.now()), 1000);
    return () => {
      cancelar();
      clearInterval(intervalo);
    };
  }, [caminhoSensor]);

  const carregando =
    !dispositivoCarregado || (!!dispositivo && !dadosCarregados);
  const semDispositivo = dispositivoCarregado && dispositivo === null;

  const ultimoContato = parseHoraTexto(dados?.ultimoContato ?? null);
  const online =
    ultimoContato !== null &&
    agora - ultimoContato.getTime() < limite_offline_ms;
  const monitorando = dados?.controle?.ativo !== false;

  //os sensores
  const valores = {
    ph: lerNumero(dados?.SensorPH?.valor),
    tds: lerNumero(dados?.SensorTDS?.valor),
    turbidez: lerNumero(dados?.SensorTurbidez?.valor),
    temp: lerNumero(dados?.SensorTemp?.valor),
  };

  const sensores: SensorHardware[] = [
    { chave: "ph", nome: "Sensor PH" },
    { chave: "tds", nome: "Sensor TDS" },
    { chave: "turbidez", nome: "Sensor turbidez" },
    { chave: "temp", nome: "Sensor Temperatura" },
  ].map((s) => {
    const chave = s.chave as SensorHardware["chave"];
    return {
      chave,
      nome: s.nome,
      valor: valores[chave],
      status: calcularStatus(chave, valores[chave], online, monitorando),
    };
  });

  const sensoresFuncionando = sensores.filter(
    (s) => s.status === "funcionando",
  ).length;

  //falhas: dispositivo sem sinal ou sensores sem leitura valida
  const falhas: string[] = [];
  if (!online) {
    falhas.push("Dispositivo sem sinal");
  } else if (monitorando) {
    sensores
      .filter((s) => s.status === "sem-leitura")
      .forEach((s) => falhas.push(`${s.nome} sem leitura válida`));
  }

  //leitura mais recente entre os sensores
  const horasLeitura = [
    dados?.SensorPH?.hora,
    dados?.SensorTDS?.hora,
    dados?.SensorTurbidez?.hora,
    dados?.SensorTemp?.hora ?? dados?.SensorTemperatura?.hora,
  ]
    .map((h) => parseHoraTexto(h ?? null))
    .filter((d): d is Date => d !== null);
  const ultimaLeitura = horasLeitura.length
    ? new Date(Math.max(...horasLeitura.map((d) => d.getTime())))
    : null;

  //tempo desde que o aparelho ligou (o firmware grava info/iniciadoEm)
  const iniciadoEm = parseHoraTexto(dados?.info?.iniciadoEm ?? null);
  const tempoConectadoMs =
    online && iniciadoEm ? agora - iniciadoEm.getTime() : null;

  return {
    carregando,
    semDispositivo,
    conectado: online,
    monitorando,
    codigo: dispositivo?.codigo ?? null,
    nome: dispositivo?.nome ?? null,
    ultimoContato,
    ultimaLeitura,
    tempoConectadoMs,
    sensores,
    sensoresFuncionando,
    totalSensores: sensores.length,
    falhas,
    erro,
  };
}
