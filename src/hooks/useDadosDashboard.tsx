import { useMemo } from "react";
import type { Analise } from "./useAnalises";

export type PeriodoGrafico = "dia" | "semana" | "mês";

export type PontoGrafico = {
  rotulo: string; 
  quantidade: number; 
};

export function useDadosGrafico(analises: Analise[], periodo: PeriodoGrafico) {
  return useMemo<PontoGrafico[]>(() => {
    const agora = new Date();

    // quantos intervalos o gráfico mostra: dia = 24 horas, semana = 7 dias, mês = 30 dias
    const totalIntervalos =
      periodo === "dia" ? 24 : periodo === "semana" ? 7 : 30;

    // devolve o começo do intervalo (hora cheia no modo dia, meia-noite nos outros)
    const inicioDoIntervalo = (d: Date) =>
      periodo === "dia"
        ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours())
        : new Date(d.getFullYear(), d.getMonth(), d.getDate());

    // cria todos os intervalos já zerados, do mais antigo para o mais novo
    const intervalos = new Map<number, PontoGrafico>();
    for (let i = totalIntervalos - 1; i >= 0; i--) {
      const inicio =
        periodo === "dia"
          ? new Date(
              agora.getFullYear(),
              agora.getMonth(),
              agora.getDate(),
              agora.getHours() - i,
            )
          : new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - i);

      const rotulo =
        periodo === "dia"
          ? `${inicio.getHours()}h`
          : inicio.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            });

      intervalos.set(inicio.getTime(), { rotulo, quantidade: 0 });
    }
    for (const analise of analises) {
      const intervalo = intervalos.get(inicioDoIntervalo(analise.data).getTime());
      if (intervalo) intervalo.quantidade += 1;
    }

    return Array.from(intervalos.values());
  }, [analises, periodo]);
}

export type ClasseMedicao = "adequada" | "atencao" | "critica";

export type PontoMedicao = {
  classe: ClasseMedicao;
  nome: string;
  quantidade: number;
  cor: string;
};

function classeDoStatus(status: string | null | undefined): ClasseMedicao {
  const s = (status ?? "").toLowerCase();
  if (s.startsWith("pot") || s.startsWith("adeq")) return "adequada";
  if (s.startsWith("cr")) return "critica";
  return "atencao";
}

export function useResumoMedicoes(analises: Analise[]) {
  return useMemo<PontoMedicao[]>(() => {
    const contagem: Record<ClasseMedicao, number> = {
      adequada: 0,
      atencao: 0,
      critica: 0,
    };
    for (const a of analises) contagem[classeDoStatus(a.status)] += 1;

    return [
      { classe: "adequada", nome: "Adequada", quantidade: contagem.adequada, cor: "var(--cor-terciaria-seguras4)" },
      { classe: "atencao", nome: "Atenção", quantidade: contagem.atencao, cor: "var(--cor-terciaria-alertas)" },
      { classe: "critica", nome: "Crítica", quantidade: contagem.critica, cor: "var(--cor-terciaria-erro)" },
    ];
  }, [analises]);
}

export type SensorId = "ph" | "turbidez" | "temp" | "tds";

export type PontoSensor = {
  rotulo: string;
  valor: number;
};

export function useSeriesSensores(analises: Analise[], maximo = 30) {
  return useMemo<Record<SensorId, PontoSensor[]>>(() => {
    const recentes = [...analises]
      .sort((a, b) => a.data.getTime() - b.data.getTime())
      .slice(-maximo);

    const montar = (campo: SensorId): PontoSensor[] =>
      recentes
        .filter((a) => typeof a[campo] === "number")
        .map((a) => ({
          rotulo: a.data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          valor: a[campo] as number,
        }));

    return {
      ph: montar("ph"),
      turbidez: montar("turbidez"),
      temp: montar("temp"),
      tds: montar("tds"),
    };
  }, [analises, maximo]);
}