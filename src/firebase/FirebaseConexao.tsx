import estilos from "./FirebaseConexao.module.css";
import mascote from "../assets/imagens/splash-cat.png";

import { initializeApp, FirebaseError } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { useEffect, useState } from "react";

// Protege as credenciais em variáveis de ambiente
const firebaseConfig = {
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Inicializa o Firebase
const conexao = initializeApp(firebaseConfig);

// Habilita o serviço de Autenticação
const autenticacao = getAuth(conexao);

// Habilita o serviço de Banco de Dados (Firestore)
export const bancoDados = getFirestore(conexao);

// Habilita o serviço de banco de dados em tempo real (Realtime)
export const bancoTempoReal = getDatabase(conexao);

// Habilita o serviço de armazenamento de arquivos
export const armazenamento = getStorage(conexao);

//Define que o usuário será automaticamente deslogado ao fechar a aba ou o navegador (sessão não persiste entre reaberturas).
setPersistence(autenticacao, browserSessionPersistence).catch((error) => {
  console.error("Erro ao definir persistência de autenticação:", error);
});

export { autenticacao };

async function testarServidor(): Promise<boolean> {
  try {
    await getDocFromServer(doc(bancoDados, "_conexao", "ping"));
    return true;
  } catch (error) {
    if (error instanceof FirebaseError && error.code === "permission-denied") {
      return true;
    }
    return false;
  }
}

function traduzirErro(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
        return "Chave de API do Firebase inválida!";
      case "auth/network-request-failed":
        return "Falha de rede! Verifique sua internet.";
      case "auth/too-many-requests":
        return "IP bloqueado temporariamente por excesso de tentativas (aguarde alguns minutos).";
      default:
        return `Erro do Firebase: ${error.code}`;
    }
  }
  return `Erro imprevisto! (${error})`;
}
export function FirebaseConexao() {
  const [authPronto, setAuthPronto] = useState(false);
  const [servidorOk, setServidorOk] = useState(false);
  const [semRede, setSemRede] = useState(false);
  const [erroFatal, setErroFatal] = useState<string | null>(null);
  const [removido, setRemovido] = useState(false);

  const conectado = authPronto && servidorOk;

  useEffect(() => {
    const cancelar = onAuthStateChanged(
      autenticacao,
      () => setAuthPronto(true),
      (error) => setErroFatal(traduzirErro(error)),
    );
    return () => cancelar();
  }, []);

  useEffect(() => {
    let cancelado = false;
    let timer: ReturnType<typeof setTimeout>;

    const tentar = async () => {
      const ok = await testarServidor();
      if (cancelado) return;

      if (ok) {
        setSemRede(false);
        setServidorOk(true);
      } else {
        setSemRede(true);
        timer = setTimeout(tentar, 3000);
      }
    };

    const aoVoltarOnline = () => {
      clearTimeout(timer);
      tentar();
    };

    window.addEventListener("online", aoVoltarOnline);
    tentar();

    return () => {
      cancelado = true;
      clearTimeout(timer);
      window.removeEventListener("online", aoVoltarOnline);
    };
  }, []);

  useEffect(() => {
    if (!conectado) return;
    const t = setTimeout(() => setRemovido(true), 600);
    return () => clearTimeout(t);
  }, [conectado]);

  if (removido) return null;

  return (
    <div
      className={`${estilos.splash} ${conectado ? estilos.splashSaindo : ""}`}
      role="status"
      aria-live="polite"
    >
      {erroFatal ? (
        <>
          <p className={estilos.splashErro}>{erroFatal}</p>
          <button
            className={estilos.splashBotao}
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </>
      ) : (
        <>
          <img
            src={mascote}
            alt="Carregando"
            className={estilos.splashMascote}
            draggable={false}
          />
          <p className={estilos.splashTexto}>
            {semRede
              ? "Sem conexão com o servidor. Tentando novamente..."
              : "Verificando conexão..."}
          </p>
        </>
      )}
    </div>
  );
}
