import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { bancoDados, autenticacao } from "../firebase/FirebaseConexao";

export interface Reservatorio {
  id: string;
  codigo: string;
  local: string;
  tipoDono: "instituicao" | "usuario";
  instituicao: string;
  endereco: string;
  criadoEm: Date;
}

//campos que o formulario envia (codigo, id e data de criacao sao gerados aqui)
export interface FormularioReservatorio {
  local: string;
  tipoDono: "instituicao" | "usuario";
  instituicao: string;
  endereco: string;
}

export function useReservatorios() {
  const [reservatorios, setReservatorios] = useState<Reservatorio[]>([]);
  const [emUsoId, setEmUsoId] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const cancelarSnapshotRef = useRef<() => void>(() => {});
  const cancelarEmUsoRef = useRef<() => void>(() => {});

  useEffect(() => {
    const cancelarAuth = onAuthStateChanged(autenticacao, (usuario) => {
      cancelarSnapshotRef.current();
      cancelarEmUsoRef.current();

      if (!usuario) {
        setReservatorios([]);
        setEmUsoId(null);
        setCarregando(false);
        return;
      }

      setCarregando(true);

      const consulta = query(
        collection(bancoDados, "reservatorios"),
        where("usuarioId", "==", usuario.uid),
        orderBy("criadoEm", "asc"),
      );

      cancelarSnapshotRef.current = onSnapshot(
        consulta,
        (snapshot) => {
          const lista = snapshot.docs.map((documento) => {
            const dados = documento.data({ serverTimestamps: "estimate" });
            return {
              id: documento.id,
              codigo: dados.codigo ?? documento.id,
              local: dados.local ?? "",
              tipoDono: dados.tipoDono ?? "instituicao",
              instituicao: dados.instituicao ?? "",
              endereco: dados.endereco ?? "",
              criadoEm: dados.criadoEm?.toDate() ?? new Date(),
            } as Reservatorio;
          });
          setReservatorios(lista);
          setCarregando(false);
        },
        (e) => {
          setErro(e.message);
          setCarregando(false);
        },
      );

      //acompanha em tempo real qual reservatorio esta em uso
      cancelarEmUsoRef.current = onSnapshot(
        doc(bancoDados, "reservatorioEmUso", usuario.uid),
        (documento) => {
          setEmUsoId(
            documento.exists() ? (documento.data().reservatorioId ?? null) : null,
          );
        },
        (e) => setErro(e.message),
      );
    });

    return () => {
      cancelarAuth();
      cancelarSnapshotRef.current();
      cancelarEmUsoRef.current();
    };
  }, []);

  async function adicionar(dados: FormularioReservatorio) {
    const usuario = autenticacao.currentUser;
    if (!usuario) throw new Error("Usuário não autenticado.");

    const refContador = doc(bancoDados, "contadores", "reservatorios");
    const refNovo = doc(collection(bancoDados, "reservatorios")); 

    //transacao garante que dois cadastros ao mesmo tempo nao gerem o mesmo codigo
    await runTransaction(bancoDados, async (transacao) => {
      const contador = await transacao.get(refContador);
      const atual = contador.exists()
        ? (contador.data().proximoNumero ?? 1)
        : 1;
      const codigo = `Res-${String(atual).padStart(5, "0")}`;

      transacao.set(refContador, { proximoNumero: atual + 1 }, { merge: true });
      transacao.set(refNovo, {
        usuarioId: usuario.uid,
        codigo,
        local: dados.local.trim(),
        tipoDono: dados.tipoDono,
        instituicao:
          dados.tipoDono === "instituicao" ? dados.instituicao.trim() : "",
        endereco: dados.endereco.trim(),
        criadoEm: serverTimestamp(),
      });
    });
  }

  async function editar(id: string, dados: FormularioReservatorio) {
    const usuario = autenticacao.currentUser;
    if (!usuario) throw new Error("Usuário não autenticado.");

    const lote = writeBatch(bancoDados);

    //codigo, usuarioId e criadoEm nao mudam na edicao
    lote.update(doc(bancoDados, "reservatorios", id), {
      local: dados.local.trim(),
      tipoDono: dados.tipoDono,
      instituicao:
        dados.tipoDono === "instituicao" ? dados.instituicao.trim() : "",
      endereco: dados.endereco.trim(),
    });

    //se for o reservatorio em uso, as proximas analises ja saem com o local novo
    if (id === emUsoId) {
      lote.update(doc(bancoDados, "reservatorioEmUso", usuario.uid), {
        local: dados.local.trim(),
      });
    }

    await lote.commit();
  }

  async function excluir(id: string) {
    const usuario = autenticacao.currentUser;
    if (!usuario) throw new Error("Usuário não autenticado.");

    const lote = writeBatch(bancoDados);
    lote.delete(doc(bancoDados, "reservatorios", id));

    //se estava em uso, limpa a escolha
    if (id === emUsoId) {
      lote.delete(doc(bancoDados, "reservatorioEmUso", usuario.uid));
    }

    await lote.commit();
  }

  //define o local de coleta: as proximas analises usam este reservatorio
  async function utilizar(reservatorio: Reservatorio) {
    const usuario = autenticacao.currentUser;
    if (!usuario) throw new Error("Usuário não autenticado.");

    await setDoc(doc(bancoDados, "reservatorioEmUso", usuario.uid), {
      reservatorioId: reservatorio.id,
      codigo: reservatorio.codigo,
      local: reservatorio.local,
      atualizadoEm: serverTimestamp(),
    });
  }

  return {
    reservatorios,
    emUsoId,
    carregando,
    erro,
    adicionar,
    editar,
    excluir,
    utilizar,
  };
}