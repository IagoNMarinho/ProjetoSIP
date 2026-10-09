import estilos from "./ModalReservatorio.module.css";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FaCircle } from "react-icons/fa6";

//formato dos dados que o formulario usa (depois a gente liga com o tipo do hook useReservatorios)
export interface DadosReservatorio {
  id?: string;
  codigo?: string;
  local: string;
  tipoDono: "instituicao" | "usuario";
  instituicao: string;
  endereco: string;
  criadoEm?: Date;
}

interface ModalReservatorioProps {
  exibir: boolean;
  modo: "adicionar" | "editar";
  reservatorioSelecionado?: DadosReservatorio | null;
  salvar: (dados: DadosReservatorio) => void | Promise<void>;
  ocultar: () => void;
}

const reservatorioSchema = z
  .object({
    tipoDono: z.enum(["instituicao", "usuario"], {
      message: "Selecione a quem o reservatório pertence.",
    }),

    local: z
      .string()
      .trim()
      .min(3, { message: "Informe o local com no mínimo 3 caracteres." })
      .max(60, { message: "O local deve ter no máximo 60 caracteres." }),

    instituicao: z.string().trim(),

    endereco: z
      .string()
      .trim()
      .min(10, { message: "Informe o endereço completo (rua, número, bairro e cidade)." })
      .max(150, { message: "O endereço deve ter no máximo 150 caracteres." }),
  })
  .superRefine((dados, ctx) => {
    //a instituicao so e obrigatoria quando o reservatorio pertence a uma
    if (dados.tipoDono === "instituicao" && dados.instituicao.length < 3) {
      ctx.addIssue({
        code: "custom",
        path: ["instituicao"],
        message: "Informe o nome da instituição.",
      });
    }
  });

type FormValues = z.infer<typeof reservatorioSchema>;

const formularioVazio: FormValues = {
  local: "",
  tipoDono: "instituicao",
  instituicao: "",
  endereco: "",
};

export function ModalReservatorio({
  exibir,
  modo,
  reservatorioSelecionado,
  salvar,
  ocultar,
}: ModalReservatorioProps) {
  //no modo editar ja começa preenchido com o reservatorio escolhido, no adicionar começa vazio
  const valoresIniciais: FormValues =
    modo === "editar" && reservatorioSelecionado
      ? {
          local: reservatorioSelecionado.local,
          tipoDono: reservatorioSelecionado.tipoDono,
          instituicao: reservatorioSelecionado.instituicao,
          endereco: reservatorioSelecionado.endereco,
        }
      : formularioVazio;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(reservatorioSchema),
    defaultValues: valoresIniciais,
  });

  //sempre que o modal abre, volta para os valores iniciais (senao, ao reabrir, apareceria o que foi digitado antes)
  useEffect(() => {
    if (exibir) {
      reset(valoresIniciais);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exibir]);

  const tipoDono = watch("tipoDono");

  if (!exibir) {
    return null;
  }

  //so e chamado quando o Zod aprova todos os campos; espera o salvamento terminar para travar o botao
  const aoEnviar = async (dados: FormValues) => {
    await salvar(dados);
  };

  return (
    <div className={estilos.fundo}>
      <div className={estilos.conteiner}>
        <div className={estilos.cabecalho}>
          <h2>
            {modo === "adicionar"
              ? "Adicionar reservatório"
              : "Editar reservatório"}
          </h2>
        </div>

        <form className={estilos.formulario} onSubmit={handleSubmit(aoEnviar)}>
          {/* codigo e data de criacao so aparecem na edicao e nao podem ser alterados */}
          {modo === "editar" && (
            <div className={estilos.informacoes}>
              <p>
                <strong>Código:</strong> {reservatorioSelecionado?.codigo ?? "--"}
              </p>
              <p>
                <strong>Criado em:</strong>{" "}
                {reservatorioSelecionado?.criadoEm?.toLocaleDateString("pt-BR") ??
                  "--"}
              </p>
            </div>
          )}

          <div className={estilos.campo}>
            <span className={estilos.rotulo}>Pertence a</span>
            <div className={estilos.opcoes}>
              <button
                type="button"
                className={estilos.opcao}
                data-ativo={tipoDono === "instituicao"}
                onClick={() => setValue("tipoDono", "instituicao")}
              >
                <FaCircle />
                Instituição
              </button>

              <button
                type="button"
                className={estilos.opcao}
                data-ativo={tipoDono === "usuario"}
                onClick={() => {
                  setValue("tipoDono", "usuario");
                  clearErrors("instituicao");
                }}
              >
                <FaCircle />
                Usuário
              </button>
            </div>

            {errors.tipoDono && (
              <p className={estilos.mensagem}>{errors.tipoDono.message}</p>
            )}
          </div>

          <label className={estilos.campo}>
            <span className={estilos.rotulo}>Local</span>
            <input
              type="text"
              className={estilos.input}
              placeholder="Ex: Caixa d'água do bloco A"
              {...register("local")}
            />

            {errors.local && (
              <p className={estilos.mensagem}>{errors.local.message}</p>
            )}
          </label>

          {tipoDono === "instituicao" && (
            <label className={estilos.campo}>
              <span className={estilos.rotulo}>Instituição</span>
              <input
                type="text"
                className={estilos.input}
                placeholder="Nome da instituição"
                {...register("instituicao")}
              />

              {errors.instituicao && (
                <p className={estilos.mensagem}>{errors.instituicao.message}</p>
              )}
            </label>
          )}

          <label className={estilos.campo}>
            <span className={estilos.rotulo}>Endereço</span>
            <input
              type="text"
              className={estilos.input}
              placeholder="Rua, número, bairro, cidade"
              {...register("endereco")}
            />

            {errors.endereco && (
              <p className={estilos.mensagem}>{errors.endereco.message}</p>
            )}
          </label>

          <div className={estilos.acoes}>
            <button
              type="button"
              className={`${estilos.botao} ${estilos.botaoSecundario}`}
              onClick={ocultar}
              disabled={isSubmitting}
            >
              Cancelar
            </button>

            <button type="submit" className={estilos.botao} disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : modo === "adicionar"
                  ? "Adicionar"
                  : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}