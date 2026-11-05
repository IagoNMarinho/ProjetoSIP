import { jsPDF } from "jspdf";

import baiacu from "../../../assets/imagens/baiacu.png";
import contaminara from "../../../assets/imagens/contaminara.png";
import aguato from "../../../assets/imagens/aguato-mascoteCabeca.png";

export type StatusPdf = "adequada" | "atencao" | "critica" | "indefinido";

export interface DadosPdf {
  status: StatusPdf;
  local: string;
  hora: Date | null;
  ph?: number | string | null;
  tds?: number | string | null;
  turbidez?: number | string | null;
  temp?: number | string | null;
  nomeArquivo?: string;
}

// Cores do PDF (o jsPDF só aceita hex)
const CORES_PDF = {
  adequada:   { faixa: "#2e9e5b", pilula: "#2e9e5b", textoPilula: "#ffffff" },
  atencao:    { faixa: "#f5a623", pilula: "#fffdd9", textoPilula: "#f5a623" },
  critica:    { faixa: "#d64545", pilula: "#d64545", textoPilula: "#ffffff" },
  indefinido: { faixa: "#1b2a49", pilula: "#ffffff", textoPilula: "#3b4a6b" },
};

const COR_TEXTO = "#1b2a49";
const COR_ROTULO = "#6b7794";
const COR_LINHA = "#e6e8ee";

const TEXTO_STATUS = {
  adequada: "Segura!",
  atencao: "Atenção!",
  critica: "Crítica!",
  indefinido: "Aguardando...",
};

const RESULTADO = {
  adequada: "ÁGUA POTÁVEL",
  atencao: "ATENÇÃO",
  critica: "CRÍTICA",
  indefinido: "SEM LEITURA",
};

const IMAGEM_MASCOTE = {
  adequada: aguato,
  atencao: baiacu,
  critica: contaminara,
  indefinido: baiacu,
};

const carregarImagem = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export async function gerarPdfAnalise(dados: DadosPdf) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const cor = CORES_PDF[dados.status];
  const textoStatus = TEXTO_STATUS[dados.status];
  const resultadoFeedback = RESULTADO[dados.status];

  const larguraPagina = doc.internal.pageSize.getWidth();
  const alturaPagina = doc.internal.pageSize.getHeight();
  const largura = 220;
  const x = (larguraPagina - largura) / 2;
  let y = 30;

  doc.setFillColor(cor.faixa);
  doc.roundedRect(x, y, largura, 16, 5, 5, "F");
  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(textoStatus.toUpperCase(), larguraPagina / 2, y + 10.5, { align: "center" });

  y += 22;
  const alturaLinha = 14;
  const alturaSensores = 22;
  const alturaCard = alturaLinha * 4 + alturaSensores;

  doc.setFillColor("#ffffff");
  doc.setDrawColor(COR_LINHA);
  doc.roundedRect(x, y, largura, alturaCard, 4, 4, "FD");

  const horario =
    dados.hora?.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }) ?? "--";
  const data = dados.hora?.toLocaleDateString("pt-BR") ?? "--";

  const linhas = [
    ["Feedback:", resultadoFeedback],
    ["Local realizado:", dados.local],
    ["Horário realizado:", horario],
    ["Data:", data],
  ];

  linhas.forEach(([rotulo, valor], i) => {
    const yLinha = y + i * alturaLinha;
    const yTexto = yLinha + alturaLinha / 2 + 1.5;

    if (i > 0) {
      doc.setDrawColor(COR_LINHA);
      doc.line(x, yLinha, x + largura, yLinha);
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(COR_ROTULO);
    doc.text(rotulo.toUpperCase(), x + 8, yTexto);

    doc.setFontSize(11);
    if (i === 0) {
      doc.setFont("helvetica", "bold");
      const larguraPilula = doc.getTextWidth(valor) + 10;
      doc.setFillColor(cor.pilula);
      doc.roundedRect(x + largura - 8 - larguraPilula, yLinha + 3.5, larguraPilula, 7, 3.5, 3.5, "F");
      doc.setTextColor(cor.textoPilula);
      doc.text(valor, x + largura - 8 - larguraPilula / 2, yTexto, { align: "center" });
    } else {
      doc.setTextColor(COR_TEXTO);
      doc.text(valor, x + largura - 8, yTexto, { align: "right" });
    }
  });

  const ySensores = y + alturaLinha * 4;
  doc.setDrawColor(COR_LINHA);
  doc.line(x, ySensores, x + largura, ySensores);

  const sensores = [
    ["pH", String(dados.ph ?? "--"), ""],
    ["TDS", String(dados.tds ?? "--"), "ppm"],
    ["Turbidez", String(dados.turbidez ?? "--"), "NTU"],
    ["Temp.", String(dados.temp ?? "--"), "°C"],
  ];

  const larguraCelula = largura / 4;

  sensores.forEach(([nome, valor, unidade], i) => {
    const xCelula = x + i * larguraCelula;
    const xCentro = xCelula + larguraCelula / 2;

    if (i > 0) doc.line(xCelula, ySensores, xCelula, ySensores + alturaSensores);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(COR_TEXTO);
    doc.text(nome.toUpperCase(), xCentro, ySensores + 7, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(valor, xCentro, ySensores + 14, { align: "center" });

    if (unidade) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(COR_ROTULO);
      doc.text(unidade, xCentro, ySensores + 18.5, { align: "center" });
    }
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(COR_ROTULO);
  doc.text(`Gerado em ${new Date().toLocaleString("pt-BR")}`, larguraPagina / 2, y + alturaCard + 8, {
    align: "center",
  });
  doc.text(`Projeto SIP © Todos os direitos reservados.`, larguraPagina / 2, y + alturaCard + 15, {
    align: "center",
  });

  const img = await carregarImagem(IMAGEM_MASCOTE[dados.status]);
  const larguraImg = 35;
  const alturaImg = (img.height * larguraImg) / img.width;
  const margemInferior = 8;

  const xImg = (larguraPagina - larguraImg) / 2;
  const yImg = alturaPagina - alturaImg - margemInferior;

  doc.addImage(img, "PNG", xImg, yImg, larguraImg, alturaImg);

  doc.save(dados.nomeArquivo ?? "analise-agua.pdf");
}