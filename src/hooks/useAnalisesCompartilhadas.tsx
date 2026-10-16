import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { autenticacao, bancoDados } from "../firebase/FirebaseConexao";
import type { Analise } from "./useAnalises";

export interface VinculoInstituicao {
  dispositivoCodigo: string;
  codigoAcesso: string;
  instituicaoId: string;
  nomeInstituicao: string;
}

export function useAnalisesCompartilhadas() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [ehUsuarioComum, setEhUsuarioComum] = useState<boolean | null>(null);
  const [vinculos, setVinculos] = useState<VinculoInstituicao[]>([]);
  const [vinculosCarregados, setVinculosCarregados] = useState(false);
  const [codigoSelecionado, setCodigoSelecionado] = useState<string | null>(
    null,
  );
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [carregandoAnalises, setCarregandoAnalises] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const cancelar = onAuthStateChanged(autenticacao, (usuario) => {
      setUsuarioId(usuario?.uid ?? null);
    });
    return () => cancelar();
  }, []);

  //descobre se o login e do tipo usuario (existe em usuarios/{uid}) ou instituicao
  useEffect(() => {
    if (!usuarioId) {
      setEhUsuarioComum(null);
      return;
    }
    let cancelado = false;
    getDoc(doc(bancoDados, "usuarios", usuarioId))
      .then((d) => {
        if (!cancelado) setEhUsuarioComum(d.exists());
      })
      .catch(() => {
        if (!cancelado) setEhUsuarioComum(false);
      });
    return () => {
      cancelado = true;
    };
  }, [usuarioId]);

  //acompanha os codigos que o usuario ja ativou e descobre a instituicao de cada um
  useEffect(() => {
    if (!usuarioId || !ehUsuarioComum) {
      setVinculos([]);
      setVinculosCarregados(false);
      return;
    }

    let cancelado = false;
    const cancelar = onSnapshot(
      query(collection(bancoDados, "vinculos"), where("uid", "==", usuarioId)),
      async (resultado) => {
        try {
          const lista = await Promise.all(
            resultado.docs.map(async (v) => {
              const dispositivoCodigo = v.data().dispositivoCodigo as string;
              const codigoAcesso = v.data().codigoAcesso as string;

              //se a instituicao trocou o codigo de acesso, este vinculo nao vale mais
              const acesso = await getDoc(
                doc(bancoDados, "acessos", codigoAcesso),
              );
              if (!acesso.exists()) return null;

              const disp = await getDoc(
                doc(bancoDados, "dispositivos", dispositivoCodigo),
              );
                const instituicaoId = disp.data()?.donoId as string | undefined;
              if (!instituicaoId || disp.data()?.ativo === false) return null;

              const inst = await getDoc(
                doc(bancoDados, "instituicoes", instituicaoId),
              );
              return {
                dispositivoCodigo,
                codigoAcesso,
                instituicaoId,
                nomeInstituicao: (inst.data()?.nome as string) ?? "Instituição",
              } as VinculoInstituicao;
            }),
          );
          if (!cancelado) {
            setVinculos(
              lista.filter((i): i is VinculoInstituicao => i !== null),
            );
          }
        } catch (e) {
          if (!cancelado) {
            setErro(e instanceof Error ? e.message : "erro ao carregar codigos");
          }
        } finally {
          if (!cancelado) setVinculosCarregados(true);
        }
      },
      (e) => {
        setErro(e.message);
        setVinculosCarregados(true);
      },
    );

    return () => {
      cancelado = true;
      cancelar();
    };
  }, [usuarioId, ehUsuarioComum]);

  //se o usuario tem mais de um codigo, usa o escolhido; senao o primeiro
  const vinculoAtual =
    vinculos.find((v) => v.dispositivoCodigo === codigoSelecionado) ??
    vinculos[0] ??
    null;
  const codigoAtual = vinculoAtual?.dispositivoCodigo ?? null;
  const instituicaoAtual = vinculoAtual?.instituicaoId ?? null;

  //escuta em tempo real as analises da instituicao feitas com esse dispositivo
  useEffect(() => {
    if (!codigoAtual || !instituicaoAtual) {
      setAnalises([]);
      return;
    }

    setCarregandoAnalises(true);
    const cancelar = onSnapshot(
      query(
        collection(bancoDados, "analises"),
        where("dispositivoCodigo", "==", codigoAtual),
        where("usuarioId", "==", instituicaoAtual), //so as da instituicao
        orderBy("data", "desc"),
        limit(100),
      ),
      (snapshot) => {
        setAnalises(
          snapshot.docs.map((d) => {
            const dados = d.data();
            return {
              id: d.id,
              codigo: dados.codigo ?? d.id,
              local: dados.local ?? null,
              data: dados.data?.toDate() ?? new Date(),
              tds: dados.tds ?? null,
              ph: dados.ph ?? null,
              turbidez: dados.turbidez ?? null,
              temp: dados.temp ?? null,
              status: dados.status ?? "Atenção",
            } as Analise;
          }),
        );
        setCarregandoAnalises(false);
      },
      (e) => {
        setErro(e.message);
        setCarregandoAnalises(false);
      },
    );

    return () => cancelar();
  }, [codigoAtual, instituicaoAtual]);

  //usuario comum informa o codigo de acesso compartilhado pela instituicao
  async function ativarCodigo(codigoAcesso: string): Promise<string> {
    if (!usuarioId) return "Faça login para ativar um código.";
    try {
      const acesso = await getDoc(doc(bancoDados, "acessos", codigoAcesso));
      if (!acesso.exists()) return "Código inválido.";

      const dispositivoCodigo = acesso.data().dispositivoCodigo as string;
      const disp = await getDoc(
        doc(bancoDados, "dispositivos", dispositivoCodigo),
      );
      if (!disp.exists() || disp.data().ativo === false) {
        return "Código inválido.";
      }

      await setDoc(
        doc(bancoDados, "vinculos", `${usuarioId}_${dispositivoCodigo}`),
        {
          uid: usuarioId,
          dispositivoCodigo,
          codigoAcesso,
          tipo: "visualizador",
          criadoEm: serverTimestamp(),
        },
      );
      setCodigoSelecionado(dispositivoCodigo);
      return "sucesso";
    } catch (e) {
      return e instanceof Error ? e.message : "Erro ao ativar o código.";
    }
  }

  //remove o acesso do usuario a esse dispositivo
  async function desvincular(dispositivoCodigo: string) {
    if (!usuarioId) return;
    try {
      await deleteDoc(
        doc(bancoDados, "vinculos", `${usuarioId}_${dispositivoCodigo}`),
      );
    } catch (e) {
      setErro(e instanceof Error ? e.message : "erro ao remover o código");
    }
  }

  return {
    ehUsuarioComum,
    vinculos,
    vinculosCarregados,
    vinculoAtual,
    selecionarCodigo: setCodigoSelecionado,
    analises,
    carregandoAnalises,
    erro,
    ativarCodigo,
    desvincular,
  };
}