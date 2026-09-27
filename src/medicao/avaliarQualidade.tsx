export type Status = "indefinido" | "adequada" | "atencao" | "critica";

export interface Leituras {
  tds: number | null;
  ph: number | null;
  turbidez: number | null;
  temp: number | null;
  hora: Date | null;
}

//classifica o TDS
export function avaliaTDS(tds: number | null): Status {
  if (tds === null){
    return "indefinido";
  } else if(tds <= 50){
    return "atencao";
  } else if(tds > 50 && tds <= 300){
    return "adequada";
  } else if (tds > 300 && tds <= 600){
    return "atencao";
  } else{
    return "critica";
  }
}

//classifica o pH (nn configurado ainda)
export function avaliaPH(ph: number | null): Status {
  return "indefinido";
}

//classifica a turbidez (nn configurado ainda)
export function avaliaTurbidez(turbidez: number | null): Status {
  return "indefinido";
}

//ordem de severidade, do menos grave para o mais grave
const ordem_severidade: Status[] = ["indefinido", "adequada", "atencao", "critica"];

function piorCaso(a: Status, b: Status): Status {
  return ordem_severidade.indexOf(a) >= ordem_severidade.indexOf(b) ? a : b;
}

//combina a avaliacao de todos os parametros disponiveis, pelo pior caso entre eles
export function avaliaGeral(leituras: Leituras): Status {
  const resultados = [avaliaTDS(leituras.tds), avaliaPH(leituras.ph), avaliaTurbidez(leituras.turbidez)];
  return resultados.reduce(piorCaso, "indefinido");
}