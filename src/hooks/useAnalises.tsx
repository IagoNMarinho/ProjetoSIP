import { useEffect, useMemo, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { bancoDados, autenticacao } from "../firebase/FirebaseConexao";

export interface Analise {
  id: string;
  codigo: string;
  local: string | null;
  data: Date;
  tds: number | null;
  ph: number | null;
  turbidez: number | null;
  temp: number | null;
  status: "Potável" | "Atenção" | "Crítica";
}

export interface EstatisticasAnalises {
  total: number;
  potavel: number;
  atencao: number;
  critica: number;
}

export function useAnalises() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const cancelarSnapshotRef = useRef<() => void>(() => {});

  useEffect(() => {

  const cancelarAuth = onAuthStateChanged(autenticacao, (usuario) => {

    cancelarSnapshotRef.current();

    if (!usuario) {
      setAnalises([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);

    const consulta = query(
      collection(bancoDados, "analises"),
      where("usuarioId", "==", usuario.uid),
      orderBy("data", "desc"),
    );

    cancelarSnapshotRef.current = onSnapshot(
      consulta,
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => {
          const dados = doc.data();
          return {
            id: doc.id,
            codigo: dados.codigo ?? doc.id,
            local: dados.local ?? null,
            data: dados.data?.toDate() ?? new Date(),
            tds: dados.tds ?? null,
            ph: dados.ph ?? null,
            turbidez: dados.turbidez ?? null,
            temp: dados.temp ?? null,
            status: dados.status ?? "Atenção",
          } as Analise;
        });
        setAnalises(lista);
        setCarregando(false);
      },
      (e) => {
        setErro(e.message);
        setCarregando(false);
      },
    );
  });

  return () => {
    cancelarAuth();
    cancelarSnapshotRef.current();
  };
}, []);
  const estatisticas = useMemo<EstatisticasAnalises>(() => {
    return analises.reduce(
      (acc, analise) => {
        acc.total += 1;
        if (analise.status === "Potável") acc.potavel += 1;
        else if (analise.status === "Atenção") acc.atencao += 1;
        else if (analise.status === "Crítica") acc.critica += 1;
        return acc;
      },
      { total: 0, potavel: 0, atencao: 0, critica: 0 },
    );
  }, [analises]);

  return { analises, estatisticas, carregando, erro };
}
