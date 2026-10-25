import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { autenticacao, bancoDados } from "../firebase/FirebaseConexao";
import { registrarAtividade } from "./useAtividades";

// sem 0, O, 1, I, L para evitar confusão na hora de digitar
const alfabeto = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function gerarCodigoAleatorio() {
  const sorteio = crypto.getRandomValues(new Uint32Array(8));
  return Array.from(sorteio, (n) => alfabeto[n % alfabeto.length]).join("");
}

export function useCodigoAcesso() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [dispositivoCodigo, setDispositivoCodigo] = useState<string | null>(
    null,
  );
  const [codigoAcesso, setCodigoAcesso] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [caminhoSensor, setCaminhoSensor] = useState<string | null>(null);

  useEffect(() => {
    const cancelar = onAuthStateChanged(autenticacao, (usuario) => {
      setUsuarioId(usuario?.uid ?? null);
    });
    return () => cancelar();
  }, []);

    //codigo de ativacao do dispositivo da instituicao (salvo no cadastro)
  useEffect(() => {
    if (!usuarioId) {
      setDispositivoCodigo(null);
      setCaminhoSensor(null);
      return;
    }
    let cancelado = false;
    getDoc(doc(bancoDados, "instituicoes", usuarioId))
      .then(async (d) => {
        const codigo = (d.data()?.codigo as string | undefined) ?? null;
        if (cancelado) return;
        setDispositivoCodigo(codigo);
        if (!codigo) {
          setCaminhoSensor(null);
          return;
        }
        const disp = await getDoc(doc(bancoDados, "dispositivos", codigo));
        if (!cancelado) {
          setCaminhoSensor(disp.data()?.caminhoSensor ?? `sensores/${codigo}`);
        }
      })
      .catch((e) => {
        if (!cancelado) setErro(e.message);
      });
    return () => {
      cancelado = true;
    };
  }, [usuarioId]);

  //acompanha o codigo de acesso atual da instituicao
  useEffect(() => {
    if (!usuarioId) {
      setCodigoAcesso(null);
      setCarregando(false);
      return;
    }
    setCarregando(true);
    const cancelar = onSnapshot(
      query(
        collection(bancoDados, "acessos"),
        where("instituicaoId", "==", usuarioId),
      ),
      (resultado) => {
        setCodigoAcesso(resultado.docs[0]?.id ?? null);
        setCarregando(false);
      },
      (e) => {
        setErro(e.message);
        setCarregando(false);
      },
    );
    return () => cancelar();
  }, [usuarioId]);

  //gera um codigo novo e apaga o anterior (quem tinha o antigo perde o acesso)
  async function gerarNovoCodigo() {
    if (!usuarioId || !dispositivoCodigo) return;
    setGerando(true);
    setErro(null);
    try {
      for (let tentativa = 0; tentativa < 5; tentativa++) {
        const novo = gerarCodigoAleatorio();
        const refNovo = doc(bancoDados, "acessos", novo);
        if ((await getDoc(refNovo)).exists()) continue; //colisao, sorteia outro

        const lote = writeBatch(bancoDados);
        if (codigoAcesso) lote.delete(doc(bancoDados, "acessos", codigoAcesso));
        lote.set(refNovo, {
          dispositivoCodigo,
          instituicaoId: usuarioId,
          criadoEm: serverTimestamp(),
        });
        await lote.commit();
        registrarAtividade(
          usuarioId,
          "codigo-acesso",
          "Novo código de acesso gerado",
        );
        return;
      }
      setErro("Não foi possível gerar o código. Tente novamente.");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "erro ao gerar o código");
    } finally {
      setGerando(false);
    }
  }

  return { codigoAcesso, caminhoSensor, carregando, gerando, erro, gerarNovoCodigo };
}