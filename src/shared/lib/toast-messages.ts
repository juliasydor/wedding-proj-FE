import { toast } from 'sonner';

type EntityName = string;

export const toastMessages = {
  create: {
    success: (entity: EntityName) => toast.success(`${entity} criado(a) com sucesso!`),
    error: (entity: EntityName) => toast.error(`Erro ao criar ${entity.toLowerCase()}. Tente novamente.`),
  },
  update: {
    success: (entity: EntityName) => toast.success(`${entity} atualizado(a) com sucesso!`),
    error: (entity: EntityName) => toast.error(`Erro ao atualizar ${entity.toLowerCase()}. Tente novamente.`),
  },
  delete: {
    success: (entity: EntityName) => toast.success(`${entity} removido(a) com sucesso!`),
    error: (entity: EntityName) => toast.error(`Erro ao remover ${entity.toLowerCase()}. Tente novamente.`),
  },
  save: {
    success: () => toast.success('Alterações salvas com sucesso!'),
    error: () => toast.error('Erro ao salvar alterações. Tente novamente.'),
  },
  upload: {
    success: (item: string) => toast.success(`${item} enviado(a) com sucesso!`),
    error: (item: string) => toast.error(`Erro ao enviar ${item.toLowerCase()}. Tente novamente.`),
  },
  validation: {
    required: (field: string) => toast.error(`Por favor, preencha o campo ${field}.`),
    invalid: (field: string) => toast.error(`O campo ${field} é inválido.`),
  },
};
