import { useEffect, useRef, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import {
  collection,
  doc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  bancoTempoReal,
  bancoDados,
  autenticacao,
} from "../firebase/FirebaseConexao";
import { onAuthStateChanged } from "firebase/auth";
import { avaliaGeral, type Leituras } from "../medicao/avaliarQualidade";

const limite_offline_ms = 25000; // 2 envios perdidos
const tempo_limite_imediata_ms = 15000;

export interface AcessoDispositivo {
  codigo: string;
  caminhoSensor: string;
}

export type EstadoDispositivo =
  | "carregando"
  | "offline"
  | "pausado"
  | "medindo";

export interface ReservatorioEmUso {
  reservatorioId: string;
  codigo: string;
  local: string;
}

function parseHoraTexto(texto: string | null): Date | null {
  if (typeof texto !== "string") return null;
  const [dataParte, horaParte] = texto.split(" ");
  if (!dataParte || !horaParte) return null;
  const [dia, mes, ano] = dataParte.split("/").map(Number);
  const [h, m, s] = horaParte.split(":").map(Number);
  if ([dia, mes, ano, h, m, s].some(Number.isNaN)) return null;
  return new Date(ano, mes - 1, dia, h, m, s);
}

async function salvarAnalise(dados: Record<string, unknown>) {
  const contadorRef = doc(bancoDados, "contadores", "analises");
  const analiseRef = doc(collection(bancoDados, "analises")); //gera um id aleatorio novo, sem gravar ainda

  await runTransaction(bancoDados, async (transacao) => {
    const contadorSnap = await transacao.get(contadorRef);
    const atual = contadorSnap.exists()
      ? (contadorSnap.data().proximoNumero ?? 1)
      : 1;
    const codigo = `ANL-${String(atual).padStart(5, "0")}`;

    transacao.set(contadorRef, { proximoNumero: atual + 1 }, { merge: true });
    transacao.set(analiseRef, { ...dados, codigo });
  });
}

export function useDispositivo() {
  const [leituras, setLeituras] = useState<Leituras>({
    tds: null,
    ph: null,
    turbidez: null,
    temp: null,
    hora: null,
  });
  const [ultimoContatoTexto, setUltimoContatoTexto] = useState<string | null>(
    null,
  );
  const [ativo, setAtivo] = useState(true);
  const [intervaloMonitoramentoS, setIntervaloMonitoramentoS] = useState(10);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [enviandoComando, setEnviandoComando] = useState(false);
  const [aguardandoImediata, setAguardandoImediata] = useState(false);
  const [agora, setAgora] = useState(Date.now());
  const ultimaHoraSalva = useRef<number | null>(null);
  const horaAntesDoComando = useRef<number | null>(null);
  const inicioCicloMonitoramento = useRef<number | null>(null);
  const inicioEsperaImediata = useRef<number | null>(null);
  const estadoAnterior = useRef<EstadoDispositivo | null>(null);
  const chaveEmProcessamento = useRef<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [reservatorioEmUso, setReservatorioEmUso] = useState<ReservatorioEmUso | null>(null);
  const [reservatorioCarregado, setReservatorioCarregado] = useState(false);

  const [acessoDono, setAcessoDono] = useState<AcessoDispositivo | null>(null);
  const [donoCarregado, setDonoCarregado] = useState(false);

  //cada usuario controla o proprio dispositivo (instituicao ou usuario comum)
  const acesso = acessoDono;
  const permitido = acesso !== null;
  const podeControlar = permitido;
  const caminhoSensor = acesso?.caminhoSensor ?? null;
  const permissaoCarregada = donoCarregado;

  useEffect(() => {
    const cancelar = onAuthStateChanged(autenticacao, (usuario) => {
      setUsuarioId(usuario?.uid ?? null);
    });
    return () => cancelar();
  }, []);

  //acompanha o dispositivo do usuario logado (instituicao ou usuario comum)
  useEffect(() => {
    if (!usuarioId) {
      setAcessoDono(null);
      setDonoCarregado(false);
      return;
    }

    const cancelar = onSnapshot(
      query(
        collection(bancoDados, "dispositivos"),
        where("donoId", "==", usuarioId),
      ),
      (resultado) => {
        //por enquanto usa o primeiro dispositivo ativo encontrado
        const encontrado = resultado.docs.find((d) => d.data().ativo !== false);
        setAcessoDono(
          encontrado
            ? {
                codigo: encontrado.id,
                caminhoSensor:
                  encontrado.data().caminhoSensor ?? `sensores/${encontrado.id}`,
              }
            : null,
        );
        setDonoCarregado(true);
      },
      (e) => {
        setErro(e.message);
        setDonoCarregado(true);
      },
    );

    return () => cancelar();
  }, [usuarioId]);

  //acompanha em tempo real o reservatorio escolhido em "Utilizar"
  useEffect(() => {
    if (!usuarioId) {
      setReservatorioEmUso(null);
      setReservatorioCarregado(false);
      return;
    }

    const cancelar = onSnapshot(
      doc(bancoDados, "reservatorioEmUso", usuarioId),
      (documento) => {
        const dados = documento.data();
        setReservatorioEmUso(
          dados
            ? {
                reservatorioId: dados.reservatorioId,
                codigo: dados.codigo,
                local: dados.local,
              }
            : null,
        );
        setReservatorioCarregado(true);
      },
      (e) => setErro(e.message),
    );

    return () => cancelar();
  }, [usuarioId]);
  
  useEffect(() => {
    if (!permissaoCarregada) return;
    if (!caminhoSensor) {
      //sem permissao: nao escuta o dispositivo
      setLeituras({ tds: null, ph: null, turbidez: null, temp: null, hora: null });
      setUltimoContatoTexto(null);
      setCarregando(false);
      return;
    }
    setCarregando(true);

    //escuta o nó do dispositivo em tempo real
    const cancelar = onValue(
      ref(bancoTempoReal, caminhoSensor),
      (snapshot) => {
        const dados = snapshot.val();
        setLeituras({
          tds: dados?.Coleta?.SensorTDS ?? null,
          ph: dados?.Coleta?.SensorPH ?? null,
          turbidez: dados?.Coleta?.SensorTurbidez ?? null,
          temp: dados?.Coleta?.SensorTemp ?? null,
          hora: parseHoraTexto(dados?.Coleta?.hora ?? null),
        });
        setUltimoContatoTexto(dados?.ultimoContato ?? null);
        setAtivo(dados?.controle?.ativo !== false);
        setIntervaloMonitoramentoS(
          dados?.controle?.intervaloMonitoramento ?? 10,
        );
        setCarregando(false);
      },
      (e) => {
        setErro(e.message);
        setCarregando(false);
      },
    );

    //relogio para reavaliar "online/offline" e a porcentagem de profresso do monitoramento
    const intervalo = setInterval(() => setAgora(Date.now()), 1000);
    return () => {
      cancelar();
      clearInterval(intervalo);
    };
  }, [caminhoSensor, permissaoCarregada]);

  const ultimoContato = parseHoraTexto(ultimoContatoTexto);
  const online =
    ultimoContato !== null &&
    agora - ultimoContato.getTime() < limite_offline_ms;

  let estado: EstadoDispositivo;
  if (carregando || !permissaoCarregada) estado = "carregando";
  else if (!online) estado = "offline";
  else if (ativo) estado = "medindo";
  else estado = "pausado";

  //se o dispositivo estava offline e voltou a responder, reinicia a contagem do zero
  useEffect(() => {
    const acabouDeReconectar =
      estadoAnterior.current === "offline" && estado === "medindo";
    if (acabouDeReconectar) {
      inicioCicloMonitoramento.current = Date.now();
    }
    estadoAnterior.current = estado;
  }, [estado]);

  const corStatus = avaliaGeral(leituras);
  const progressoMonitoramento =
    estado === "medindo" && inicioCicloMonitoramento.current !== null
      ? Math.min(
          100,
          ((agora - inicioCicloMonitoramento.current) /
            (intervaloMonitoramentoS * 1000)) *
            100,
        )
      : null;

  useEffect(() => {
    if (estado !== "medindo" || !leituras.hora) return;
    const novaHora = leituras.hora.getTime();
    if (
      inicioCicloMonitoramento.current === null ||
      novaHora > inicioCicloMonitoramento.current
    ) {
      inicioCicloMonitoramento.current = novaHora;
    }
  }, [leituras.hora, estado]);

  useEffect(() => {
    if (!aguardandoImediata || !leituras.hora) return;
    if (
      horaAntesDoComando.current !== null &&
      leituras.hora.getTime() !== horaAntesDoComando.current
    ) {
      setAguardandoImediata(false);
    }
  }, [leituras.hora, aguardandoImediata]);

  //trava de seguranca: se nada voltar a tempo, para de mostrar 'lendo' mesmo assim
  useEffect(() => {
    if (!aguardandoImediata || inicioEsperaImediata.current === null) return;
    if (agora - inicioEsperaImediata.current > tempo_limite_imediata_ms) {
      setAguardandoImediata(false);
    }
  }, [agora, aguardandoImediata]);

  //salva automaticamente cada nova leitura no Firestore, do monitoramento continuo ou da leitura imediata
  useEffect(() => {
    if (!acessoDono) return; //so o dono do dispositivo salva a analise    
    if (!leituras.hora) return;
    if (!usuarioId) return; //espera a autenticacao confirmar antes de tentar salvar
    if (!reservatorioCarregado) return; //espera saber qual reservatorio esta em uso, senao a analise sairia sem local
    if (estado !== "medindo" && !aguardandoImediata) return; //só salva se o dispositivo está ativo/online ou se é o retorno de uma leitura imediata
    const chave = leituras.hora.getTime();
    if (ultimaHoraSalva.current === chave) return; //essa leitura ja foi salva com sucesso
    if (chaveEmProcessamento.current === chave) return; //ja tem uma tentativa em andamento pra essa mesma leitura

    chaveEmProcessamento.current = chave;

    (async () => {
      try {
        await salvarAnalise({
          data: Timestamp.fromDate(leituras.hora as Date),
          local: reservatorioEmUso?.local ?? null,
          reservatorioId: reservatorioEmUso?.reservatorioId ?? null,
          reservatorioCodigo: reservatorioEmUso?.codigo ?? null,
          dispositivoCodigo: acesso?.codigo ?? null,
          usuarioId: autenticacao.currentUser?.uid ?? null,
          tds: leituras.tds,
          ph: leituras.ph,
          turbidez: leituras.turbidez,
          temp: leituras.temp,
          status:
            corStatus === "adequada"
              ? "Potável"
              : corStatus === "atencao"
                ? "Atenção"
                : "Crítica",
        });
        ultimaHoraSalva.current = chave; //so marca como salva depois da confirmacao real
      } catch (e) {
        setErro(e instanceof Error ? e.message : "erro ao salvar analise");
        //nao marca como salva - na proxima vez que o efeito rodar (ex: proximo sinal de vida), tenta de novo sozinho
      } finally {
        chaveEmProcessamento.current = null;
      }
    })();
  }, [
    leituras,
    corStatus,
    usuarioId,
    reservatorioCarregado,
    reservatorioEmUso,
    acesso,
    acessoDono,
  ]);

  async function enviarComando(novoValor: boolean) {
    if (!caminhoSensor || !podeControlar) return; //sem permissao nao envia comando
    setEnviandoComando(true);
    setErro(null);
    try {
      await set(
        ref(bancoTempoReal, `${caminhoSensor}/controle/ativo`),
        novoValor,
      );
      if (novoValor) {
        inicioCicloMonitoramento.current = Date.now();
      }
    } catch (e) {
      setErro(e instanceof Error ? e.message : "erro ao enviar comando");
    } finally {
      setEnviandoComando(false);
    }
  }

  async function iniciarImediata() {
    if (!caminhoSensor || !podeControlar) return; //sem permissao nao envia comando
    setEnviandoComando(true);
    setErro(null);
    horaAntesDoComando.current = leituras.hora?.getTime() ?? 0;
    inicioEsperaImediata.current = Date.now();
    setAguardandoImediata(true);
    try {
      await set(
        ref(bancoTempoReal, `${caminhoSensor}/controle/comando`),
        "imediata",
      );
    } catch (e) {
      setErro(
        e instanceof Error ? e.message : "erro ao pedir leitura imediata",
      );
      setAguardandoImediata(false);
    } finally {
      setEnviandoComando(false);
    }
  }

   //usuario (ou instituicao) informa o codigo de ativacao do proprio dispositivo na pagina Detectar
  async function ativarCodigo(codigoAtivacao: string): Promise<string> {
    if (!usuarioId) return "Faça login para ativar um código.";
    try {
      const refDispositivo = doc(bancoDados, "dispositivos", codigoAtivacao);

      //reivindica o dispositivo (so funciona se o codigo existir e estiver livre)
      await runTransaction(bancoDados, async (t) => {
        const snap = await t.get(refDispositivo);

        if (!snap.exists() || snap.data().ativo === false) {
          throw new Error("Código de ativação inválido.");
        }
        if (snap.data().donoId) {
          throw new Error("Este código já foi utilizado.");
        }

        t.update(refDispositivo, {
          donoId: usuarioId,
          ativadoEm: serverTimestamp(),
        });
      });
      return "sucesso";
    } catch (e) {
      return e instanceof Error ? e.message : "Erro ao ativar o código.";
    }
  }
  
  return {
    leituras,
    estado,
    corStatus,
    intervaloMonitoramentoS,
    progressoMonitoramento,
    aguardandoImediata,
    reservatorioEmUso,
    erro,
    enviandoComando,
    permitido,
    podeControlar,
    permissaoCarregada,
    ativarCodigo,
    conectar: () => enviarComando(true),
    desconectar: () => enviarComando(false),
    iniciarImediata,
  };
}
