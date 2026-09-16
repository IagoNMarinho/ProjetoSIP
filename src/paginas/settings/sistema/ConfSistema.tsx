import estilos from "./ConfSistema.module.css";

import perfil from "../../../assets/imagens/perfil.png";

import { useContext, useState, useRef, useEffect } from "react";
import { AutenticacaoContexto } from "../../../contextos/AutenticacaoContexto";
import { autenticacao, bancoDados } from "../../../firebase/FirebaseConexao";
import { doc, updateDoc } from "firebase/firestore";
import { Toast } from "../../../componentes/SUPORTE/Toast/Toast";
import { enviarParaCloudinary } from "../../../componentes/APICloudinary/Cloudinary";
import { updateProfile } from "firebase/auth";

import {useForm} from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaBuilding } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { FaSlidersH } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const instituicaoSchema = z.object({
  nome: z.string().min(8, {
    message: "Informe um Nome Completo com no mínimo 8 caracteres.",
  }),
  cnpj: z.string().regex(/^\d{14}$/, {
    message: "CNPJ deve conter 14 números",
  }),
  email: z.email({
    message: "Informe um Email válido.",
  }),
  telefone: z.string().regex(/^\d{11}$/, {
    message: "Telefone deve conter 11 números.",
  }),
});

type FormValues = z.infer<typeof instituicaoSchema>;

export function ConfSistema() {
  const usuarioLogado = autenticacao.currentUser;

  // Os dados da instituição já vêm prontos do AutenticacaoContexto -
  // não precisamos buscar no Firestore aqui dentro, o Context já
  // faz isso automaticamente (inclusive depois de um F5).
  const { usuarioContexto, atualizarUsuarioContexto } = useContext(AutenticacaoContexto);

  const [editando, setEditando] = useState(false); //controla se os campos podem ser editados
  
  const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormValues>({ resolver: zodResolver(instituicaoSchema) });


  // Preenche os campos assim que os dados da instituição estiverem disponíveis 
   useEffect(() => {
    if (!usuarioContexto) return;

    reset({
      nome: usuarioContexto.nome ?? "",
      email: usuarioContexto.email ?? "",
      telefone: usuarioContexto.telefone ?? "",
      cnpj: usuarioContexto.cnpj ?? "",
    });
  }, [usuarioContexto, reset]);

  const salvarDados = async (data: FormValues) => {
    if (!usuarioLogado) {
      console.log("Nenhuma instituição está logada.");
      return;
    }
    const uid = usuarioLogado.uid;

    try {
      await updateDoc(doc(bancoDados, "instituicoes", uid), {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cnpj: data.cnpj,
      });

      await atualizarUsuarioContexto(uid);

      setEditando(false);
      mostrarToast("sucesso", "Sucesso", "Dados atualizados com sucesso!");
    } catch (erro) {
      console.error(erro);
      mostrarToast("erro", "Erro", "Não foi possível salvar os dados. Tente novamente.");
    }
  };

  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const inputFoto = useRef<HTMLInputElement>(null);

  // evita que a foto de uma conta "vaze" para outra na mesma aba.
  useEffect(() => {
    setFotoPreview((anterior) => {
      if (anterior) URL.revokeObjectURL(anterior);
      return null;
    });
  }, [usuarioContexto?.uid]);

  async function trocarFoto(e: React.ChangeEvent<HTMLInputElement>) {
      const arquivo = e.target.files?.[0];
      if (!arquivo || !usuarioLogado) return;
  
      const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
      if (!tiposPermitidos.includes(arquivo.type)) {
        mostrarToast("erro", "Formato inválido", "Envie uma imagem JPEG, PNG ou WEBP.");
        return;
      }
  
      const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
      if (arquivo.size > tamanhoMaximo) {
        mostrarToast("erro", "Arquivo muito grande", "A imagem deve ter no máximo 5MB.");
        return;
      }
  
      const url = URL.createObjectURL(arquivo);
      setFotoPreview(url); // feedback visual imediato, antes mesmo do upload terminar
  
      try {
        setEnviandoFoto(true);
  
        const urlFoto = await enviarParaCloudinary(arquivo);
  
      await updateProfile(usuarioLogado, { photoURL: urlFoto });
      await updateDoc(doc(bancoDados, "instituicoes", usuarioLogado.uid), { picture: urlFoto });
      await atualizarUsuarioContexto(usuarioLogado.uid);
  
        mostrarToast("sucesso", "Sucesso", "Foto de perfil atualizada!");
      } catch (erro) {
        console.error(erro);
        mostrarToast("erro", "Erro", "Não foi possível atualizar a foto. Tente novamente.");
        setFotoPreview(null); // desfaz o preview, já que o upload falhou
      } finally {
        setEnviandoFoto(false);
      }
    }

  const [toast, setToast] = useState<{
    exibir: boolean;
    tipo: "sucesso" | "erro";
    titulo: string;
    texto: string;
  }>({
    exibir: false,
    tipo: "sucesso",
    titulo: "",
    texto: "",
  });

  function mostrarToast(
    tipo: "sucesso" | "erro",
    titulo: string,
    texto: string,
  ) {
    setToast({ exibir: true, tipo, titulo, texto });
  }

  function fecharToast() {
    setToast((prev) => ({ ...prev, exibir: false }));
  }

  return (
    <div className={estilos.configuracoes}>
      <div className={estilos.cabecalho}>
        <h1>Sistema</h1>

        <p>
          Configure as opções de monitoramento, dispositivos, equipe, dados e
          informações da aplicação.
        </p>
      </div>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaBuilding />

          <div>
            <h2>Instituição</h2>

            <p>Gerencie as informações da instituição vinculada à conta.</p>
          </div>
        </div>
        <div className={estilos.instituicao}>
          <div className={estilos.fotoArea}>
            <div className={estilos.fotoContainer}>
              <img
                className={estilos.foto}
                src={
                  fotoPreview || autenticacao.currentUser?.photoURL || perfil
                }
                alt="Logo ou imagem da instituição"
              />
              <button
                className={estilos.botaoFoto}
                onClick={() => inputFoto.current?.click()}
                disabled={enviandoFoto}
              >
                <CiEdit />
              </button>
            </div>

            <input
              ref={inputFoto} //permite acessar o input pelo botão
              type="file" //aceita seleção de arquivos
              accept="image/*" //permite apenas imagens
              onChange={trocarFoto} //executa a troca da foto após a seleção
              style={{ display: "none" }} //esconde o input do usuário
            />
          </div>

          <form className={estilos.formulario}>
            <div className={estilos.campo}>
              <label>Nome da instituição:</label>

              <input
                {...register("nome")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.nome && (
                <p className={estilos.mensagem}>{errors.nome.message}</p>
              )}
            </div>

            <div className={estilos.campo}>
              <label>Email institucional:</label>

              <input
                {...register("email")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.email && (
                <p className={estilos.mensagem}>{errors.email.message}</p>
              )}
            </div>

            <div className={estilos.campo}>
              <label>Telefone:</label>

              <input
                {...register("telefone")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.telefone && (
                <p className={estilos.mensagem}>{errors.telefone.message}</p>
              )}
            </div>

            <div className={estilos.campo}>
              <label>CNPJ:</label>

              <input
                {...register("cnpj")}
                className={estilos.input}
                readOnly={!editando}
              />
              {errors.cnpj && (
                <p className={estilos.mensagem}>{errors.cnpj.message}</p>
              )}
            </div>
            <div className={estilos.botoes}>
              <button
                className={estilos.botao}
                type="button"
                onClick={() => setEditando(true)}
              >
                Fazer alterações
              </button>
              <button className={estilos.botao} type="submit">
                Salvar dados
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <MdNotificationsActive />

          <div>
            <h2>Monitoramento</h2>
            <p>Configure o acompanhamento da qualidade da água.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Frequência de atualização dos dados</strong>

              <span>
                Defina com que frequência os dados dos dispositivos serão
                atualizados.
              </span>
            </div>

            <select className={estilos.select}>
              <option>Automático</option>
              <option>5 minutos</option>
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>1 hora</option>
            </select>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Notificações para água contaminada</strong>

              <span>
                Receba alertas quando uma análise identificar água contaminada.
              </span>
            </div>

            <label className={estilos.switch}>
              <input type="checkbox" defaultChecked />
              <span className={estilos.slider}></span>
            </label>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Responsáveis por receber alertas</strong>

              <span>
                Defina quais responsáveis receberão notificações sobre
                alterações na qualidade da água.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaUsers />
              Configurar
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Limites para alertas</strong>

              <span>
                Configure os limites utilizados para gerar alertas durante o
                monitoramento.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaSlidersH />
              Configurar
            </button>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaMicrochip />

          <div>
            <h2>Dispositivos</h2>
            <p>Gerencie os dispositivos utilizados pelo sistema.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Gerenciar sensores e dispositivos</strong>

              <span>
                Adicione, remova ou configure os dispositivos vinculados ao
                sistema.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaMicrochip />
              Gerenciar
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Status dos dispositivos</strong>

              <span>
                Visualize o estado atual dos sensores e dispositivos conectados.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaWifi />
              Visualizar
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Testar comunicação com o dispositivo</strong>

              <span>
                Verifique se a comunicação entre o sistema e o dispositivo está
                funcionando corretamente.
              </span>
            </div>

            <button className={estilos.botao}>Testar comunicação</button>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaUsers />

          <div>
            <h2>Equipe</h2>
            <p>Gerencie os responsáveis pelo sistema.</p>
          </div>
        </div>

        <div className={estilos.opcao}>
          <div className={estilos.info}>
            <strong>Responsáveis</strong>

            <span>
              Adicione ou remova responsáveis que terão acesso às configurações
              e alertas da instituição.
            </span>
          </div>

          <button className={estilos.botao}>
            <FaUserPlus />
            Gerenciar equipe
          </button>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaInfoCircle />

          <div>
            <h2>Sobre</h2>
            <p>Informações sobre a aplicação SIP.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.informacao}>
            <strong>Versão da aplicação</strong>
            <span>v1.0.0</span>
          </div>

          <div className={estilos.informacao}>
            <strong>Equipe de desenvolvimento</strong>
            <span>Equipe SIP</span>
          </div>

          <div className={estilos.informacao}>
            <strong>Contato para suporte</strong>
            <span>Entre em contato com a equipe responsável.</span>
          </div>

          <div className={estilos.informacao}>
            <strong>Perguntas frequentes (FAQ)</strong>

            <button className={estilos.botao}>Acessar FAQ</button>
          </div>
        </div>
      </section>

      <section className={estilos.secao}>
        <div className={estilos.tituloSecao}>
          <FaDatabase />

          <div>
            <h2>Dados</h2>
            <p>Gerencie e exporte os dados das análises.</p>
          </div>
        </div>

        <div className={estilos.listaOpcoes}>
          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Histórico das análises</strong>

              <span>
                Baixe uma cópia do histórico de análises realizadas pelo
                sistema.
              </span>
            </div>

            <button className={estilos.botao}>Baixar histórico</button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Exportar dados em PDF</strong>

              <span>Gere um arquivo PDF com os dados das análises.</span>
            </div>

            <button className={estilos.botao}>
              <FaFilePdf />
              Exportar PDF
            </button>
          </div>

          <div className={estilos.opcao}>
            <div className={estilos.info}>
              <strong>Exportar dados em CSV</strong>

              <span>
                Exporte os dados das análises para utilização em outras
                aplicações.
              </span>
            </div>

            <button className={estilos.botao}>
              <FaFileCsv />
              Exportar CSV
            </button>
          </div>

          <div className={`${estilos.opcao} ${estilos.perigo}`}>
            <div className={estilos.info}>
              <strong>Limpar cache da aplicação</strong>

              <span>
                Remova dados temporários armazenados localmente pela aplicação.
              </span>
            </div>

            <button className={estilos.botaoPerigo}>
              <FaTrash />
              Limpar cache
            </button>
          </div>
        </div>
      </section>
      
            <Toast
              exibir={toast.exibir}
              tipo={toast.tipo}
              titulo={toast.titulo}
              texto={toast.texto}
              aoFechar={fecharToast}
            />
    </div>
  );
}
