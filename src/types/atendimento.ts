export interface Atendimento {
  id: string;
  notificacao: string;
  atendimento: string;
  os: string;
  placa: string;
  cliente: string;
  solicitante: string;
  dataCriada: string;
  emAndamento: boolean;
  aguardandoAprovacao: boolean;
  autorizada: boolean;
  envioMecanico: boolean;
  faturamento: boolean;
  status: number;
}