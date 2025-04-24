export interface Fornecedor {
  fornecedorId: number,
  atendimentoId: number,
  itemId: string,
  nomeFornecedor: string,
  quantidade: string,
  valor: string,
  aprovado?: boolean
}