import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { api, queryClient } from "src/config/api";
import { responseError, responseSuccess } from "src/config/responseErrors";
import { apiRoute } from "src/routes/api";
import { Regex } from "src/utils/Regex";
import Yup from "src/utils/yupValidation";

type PrioridadeType = "Alta" | "Media" | "Baixa";
type StatusType = "à Fazer" | "Atrasados" | "Feitos";

export interface ITaskDto {
  descricao: string;
  data: string;
  prioridade: PrioridadeType;
  projeto?: string;
  status: StatusType;
  funcionarios?: string[];
}

export const useCreateTask = (onClose: () => void) => {
  const schema = Yup.object().shape({
    descricao: Yup.string().required().min(1).max(250).label("Descrição"),
    data: Yup.string()
      .required()
      .matches(Regex.date_hour, "Formato: DD/MM/YY HH:MM, apenas números")
      .label("Data"),
    prioridade: Yup.string()
      .required()
      .oneOf(["Alta", "Media", "Baixa"], "Prioridade inválida")
      .label("Prioridade"),
    projeto: Yup.string().optional().label("Projeto"),
    status: Yup.string()
      .required()
      .oneOf(["à Fazer", "Atrasados", "Feitos"], "Status inválido")
      .label("Status"),
    funcionarios: Yup.array().of(Yup.string().required()).optional().min(1).label("Funcionários"),
  });

  const context = useForm<ITaskDto>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function path(data: ITaskDto): Promise<ITaskDto> {
    const result = await api().post(apiRoute.task, data);
    return result.data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: path,
    onSuccess: () => {
      responseSuccess("Tarefa criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["task-data"] });
      onClose();
    },
    onError: (erro: AxiosError) => responseError(erro),
  });

  return { mutate, isPending, context };
};
