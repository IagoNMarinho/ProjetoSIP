import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { autenticacao, bancoDados } from "../firebase/FirebaseConexao";

export type TipoAtividade =
  | "conexao"
  | "desconexao"
  | "leitura-imediata"
  | "qualidade"
  | "monitoramento-iniciado"
  | "monitoramento-pausado"
  | "codigo-acesso"
  | "reservatorio-uso"
  | "reservatorio-excluido"
  | "reservatorio-editado"
  | "reservatorio-novo"
  | "intervalo-monitoramento";

export interface Atividade {
  id: string;
  tipo: TipoAtividade;
  titulo: string;
  descricao: string | null;
  criadoEm: Date;
}

//grava um evento no feed
export async function registrarAtividade(
  usuarioId: string,
  tipo: TipoAtividade,
  titulo: string,
  descricao?: string,
) {
  try {
    await addDoc(collection(bancoDados, "atividades"), {
      usuarioId,
      tipo,
      titulo,
      descricao: descricao ?? null,
      criadoEm: serverTimestamp(),
    });
  } catch (e) {
    console.error("erro ao registrar atividade", e);
  }
}

//acompanha em tempo real as atividades mais recentes do usuario logado
export function useAtividades(maximo = 10 ) {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(autenticacao, (usuario) => {
      setUsuarioId(usuario?.uid ?? null);
    });
    return () => cancelar();
  }, []);

  useEffect(() => {
    if (!usuarioId) {
      setAtividades([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    const cancelar = onSnapshot(
      query(
        collection(bancoDados, "atividades"),
        where("usuarioId", "==", usuarioId),
        orderBy("criadoEm", "desc"),
        limit(maximo),
      ),
      (snapshot) => {
        setAtividades(
          snapshot.docs.map((d) => {
            const dados = d.data();
            return {
              id: d.id,
              tipo: dados.tipo,
              titulo: dados.titulo,
              descricao: dados.descricao ?? null,
              criadoEm: dados.criadoEm?.toDate() ?? new Date(),
            } as Atividade;
          }),
        );
        setCarregando(false);
      },
      () => setCarregando(false),
    );

    return () => cancelar();
  }, [usuarioId, maximo]);

  return { atividades, carregando };
}