import type { Fornecedor } from '@/types/fornecedor';
import React, { forwardRef } from 'react';

interface ApprovalPrintItem {
  id: string;
  descricao: string;
  marca?: string;
  referenciaFornecedor?: string;
  quantidade: number;
  precoUnitario?: number;
  valorTotal?: number;
}

interface Atendimento {
  id: number;
  observacao?: string;
  condicaoPagamento?: string;
  prazoEntrega?: string;
  formaRemessa?: string;
}

interface ApprovalPrintLayoutProps {
  items: ApprovalPrintItem[];
  fornecedores: Fornecedor[];
  atendimento: Atendimento;
  dataHoraImpressao: string;
}

const ApprovalPrintLayout = forwardRef<HTMLDivElement, ApprovalPrintLayoutProps>(
  ({ items, fornecedores, atendimento, dataHoraImpressao }, ref) => {
    console.log(fornecedores)
    return (
      <div ref={ref} className="print-container" style={{ padding: 24, fontFamily: 'sans-serif', color: '#222' }}>
        <div className="page">
          <div className="content">
            <div className="dados-faturamento">
              <table className="dados-table" style={{ width: '100%', marginBottom: 16 }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} colSpan={2}>
                      <div style={{ fontSize: 28, fontWeight: 'bold', margin: 8 }}>Logo</div>
                    </td>
                    <td colSpan={2}>
                      <div>
                        <span>DADOS DO FATURAMENTO</span>
                        <p>Vendedor: Nome do Vendedor</p>
                        <p>Comprador: Nome do Comprador</p>
                        <p>Revenda: Nome da Revenda</p>
                        <p>Empresa: Nome da Empresa</p>
                      </div>
                    </td>
                    <td colSpan={2}>
                      <div>
                        <span>FORNECEDOR</span>
                        <p>Fornecedor: {fornecedores[0]?.nomeFornecedor}</p>
                        <p></p>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px' }}>{atendimento?.id || ''}</div>
                      <p>NÚMERO</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ fontSize: 13 }}>
                      OBSERVAÇÃO: DESCRIÇÃO DA OBSERVAÇÃO
                      <span style={{ float: 'right' }}>
                        DATA E HORA DE IMPRESSÃO: {dataHoraImpressao}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ fontSize: 13 }}>
                      CONDIÇÃO DE PAGAMENTO: {atendimento?.condicaoPagamento || '-'}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ fontSize: 13 }}>
                      PRAZO DE ENTREGA: {atendimento?.prazoEntrega || '-'}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8} style={{ fontSize: 13 }}>
                      FORMA DE REMESSA: {atendimento?.formaRemessa || '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tabela-produtos">
              <table className="produtos-table" style={{ width: '100%', textAlign: 'center', marginTop: 4, borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>CÓDIGO</th>
                    <th>DESCRIÇÃO DO MATERIAL</th>
                    <th>MARCA</th>
                    <th>REFERÊNCIA FORNECEDOR</th>
                    <th>QUANTIDADE</th>
                    <th>PREÇO UNITÁRIO</th>
                    <th>Preço Serviço</th>
                    <th>Preço Mecânico</th>
                    <th>VALOR TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.descricao}</td>
                      <td>{item.marca || '-'}</td>
                      <td>{item.referenciaFornecedor || '-'}</td>
                      <td>{item.quantidade}</td>
                      <td>{item.precoUnitario !== undefined ? `R$ ${Number(item.precoUnitario).toFixed(2)}` : '-'}</td>
                      <td>{item.valorTotal !== undefined ? `R$ ${Number(item.valorTotal).toFixed(2)}` : '-'}</td>
                      <td>{item.precoUnitario !== undefined ? `R$ ${Number(item.precoUnitario).toFixed(2)}` : '-'}</td>
                      <td>{item.valorTotal !== undefined ? `R$ ${Number(item.valorTotal).toFixed(2)}` : '-'}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 18 }}>
              <div className="aprovacao-confirm" style={{ marginRight: 24 }}>
                <p>Aprovação</p>
              </div>
              <div className="aprovacao">
                <div className="subtotal">
                  <p style={{ fontWeight: 'bold' }}>TOTAL R$</p>
                  <p>{`R$ ${items.reduce((acc, item) => acc + (item.valorTotal || 0), 0).toFixed(2)}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ApprovalPrintLayout; 