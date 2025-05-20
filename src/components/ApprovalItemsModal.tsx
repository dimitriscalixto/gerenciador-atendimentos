import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowDown, Plus, PlusCircle, Plane, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdicionarItemsModal } from './AdicionarItemsModal';
import { ApprovalItem } from '@/pages/Index';
import { useMockData } from './contexts/atendimentoContext';
import { Atendimento } from '@/types/atendimento';
import { AddFornecedorModal } from './AddFornecedorModal';
import { useMockFornecedorData } from './contexts/fornecedorContext';
import { MecanicoModal } from './MacanicoModal';
import type { Fornecedor } from '@/types/fornecedor';
import { SelecionarPropostasModal } from './selecionarPropostasModal.tsx';
import ApprovalPrintLayout from './ApprovalPrintLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';


interface ApprovalItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ApprovalItem[];
  onAddItem: (item: ApprovalItem) => void;
  atendimentoId: number;
}

const ApprovalItemsModal = ({ isOpen, onClose, items, onAddItem, atendimentoId }: ApprovalItemsModalProps) => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const { mockData, setMockData } = useMockData();
  const [fornecedorModalOpen, setFornecedorModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const { mockFornecedorData, setMockFornecedorData } = useMockFornecedorData();
  const [itensAprovados, setItensAprovados] = useState<ApprovalItem[]>([]);
  const [selecionarPropostasModalOpen, setSelecionarPropostasModalOpen] = useState(false);
  const [propostasParaSelecionar, setPropostasParaSelecionar] = useState<Fornecedor[]>([]);
  const filteredFornecedor = Array.from(
    new Map(
      mockFornecedorData
        .filter((f) => f.atendimentoId === atendimentoId)
        .map((f) => [f.nomeFornecedor, f]) // chave = nomeFornecedor
    ).values()
  );
  const atendimento = mockData.filter((atendimento) => parseInt(atendimento.id) === atendimentoId);
  const [seletecFornecedorid, setSelectedFornecedorId] = useState(null);
  const [isMecanicoModalOpen, setIsMecanicoModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'transferencia' | 'providencia'>('transferencia');
  const [dataHoraImpressao] = useState(() => {
    const now = new Date();
    return now.toLocaleString('pt-BR');
  });

  const handleFornecedorModalOpen = (itemId: string, fornecedorId: number) => {
    setSelectedItemId(itemId);
    setSelectedFornecedorId(fornecedorId)
    setFornecedorModalOpen(true);
  }
  const handleAprovarAtendimento = (atendimentoId: number) => {
    const atendimento = mockData.map((atendimento) =>
      parseInt(atendimento.id) === atendimentoId
        ? { ...atendimento, status: 1 }
        : atendimento
    );
    setMockData(atendimento);
  }
  const handleAbrirSelecaoPropostas = (itemId: string, fornecedorNome: string) => {
    const propostas = mockFornecedorData.filter(f =>
      f.atendimentoId === atendimentoId &&
      f.itemId === itemId &&
      f.nomeFornecedor === fornecedorNome
    );
    setPropostasParaSelecionar(propostas);
    setSelecionarPropostasModalOpen(true);
  };

  const handleConfirmarAprovacaoSelecionadas = (selecionadas: Fornecedor[]) => {
    const atualizados = mockFornecedorData.map((f) => {
      const foiSelecionado = selecionadas.some(sel =>
        sel.itemId === f.itemId &&
        sel.fornecedorId === f.fornecedorId &&
        sel.atendimentoId === f.atendimentoId
      );
      return {
        ...f,
        aprovado: foiSelecionado,
      };
    });
    setMockFornecedorData(atualizados);
  };

  const handleAprovarCliente = (atendimentoId: number) => {
    const atendimento = mockData.map((atendimento) =>
      parseInt(atendimento.id) === atendimentoId
        ? { ...atendimento, status: 2 }
        : atendimento
    );
    const itensAprovados = items.map(item => ({ ...item, aprovado: true }));
    setItensAprovados(itensAprovados);
    setMockData(atendimento);
  }

  // Função para preparar os dados no formato esperado pelo layout de impressão
  const getPrintItems = () => {
    return items.map((item) => ({
      id: item.id,
      descricao: item.descricao,
      marca: '',
      referenciaFornecedor: '',
      quantidade: Number(item.quantidade),
      precoUnitario: Number(item.valorUnitario),
      valorTotal: Number(item.valorUnitario) * Number(item.quantidade),
    }));
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=1200');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Imprimir</title>');
      printWindow.document.write('<style>body{font-family:sans-serif;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ccc;padding:8px;} th{background:#f3f3f3;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<div id="print-root"></div>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      setTimeout(() => {
        if (printWindow.document) {
          printWindow.document.getElementById('print-root').innerHTML = printRef.current.innerHTML;
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        }
      }, 500);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-[96vw] w-full max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">{atendimento[0]?.status === 0 ? 'Em andamento' : atendimento[0]?.status === 1 ? 'Itens Aguardando Aprovação' : atendimento[0]?.status === 2 ? 'Autorizada' : 'Entrega Mecânico'} | Atendimento # {atendimentoId}</DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <div className="flex gap-2 mb-4">
              {atendimento[0]?.status <= 0 ?
                <>
                </> : ``}
              {atendimento[0]?.status === 0 ?
                <>
                  <Button
                    className="text-gray-800 font-medium rounded flex items-center gap-2"
                    variant="outline"
                    onClick={() => setIsAddItemModalOpen(true)}
                  >
                    Adicionar Item
                  </Button>
                  <Button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
                    variant="outline"
                    onClick={() => handleAprovarAtendimento(atendimentoId)}
                  >
                    Concluir / Enviar para Aprovação
                  </Button>
                  {activeTab == 'transferencia' && (
                    <Button>Gerar Transferência</Button>
                  )}
                </>
                : atendimento[0]?.status === 1 ?
                  <div>
                    <Button
                      className="bg-green-400 hover:bg-green-300 text-gray-800 font-medium py-2 px-4 rounded"
                      variant="outline"
                      onClick={() => handleAprovarCliente(atendimentoId)}
                    >
                      Aprovar
                    </Button>
                    <Button
                      className="bg-red-400 hover:bg-red-300 text-gray-800 font-medium py-2 px-4 rounded ml-4"
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </div>
                  : atendimento[0]?.status === 2 ?
                  <div>
                  <Button onClick={() => setIsMecanicoModalOpen(true)}>
                    Enviar Para o Mecânico
                  </Button>
                </div>
                : atendimento[0]?.status === 4 ?
                <Button onClick={handlePrint}>
                  Imprimir
                </Button>
                : ''
              }
            </div>
            <Tabs 
            className="w-full flex flex-col flex-grow"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'transferencia' | 'providencia')}
            >
              <TabsList>
              <TabsTrigger value="transferencia">TRANSFERÊNCIA</TabsTrigger>
              <TabsTrigger value="providencia">ITENS | PROVIDÊNCIA DE COMPRA</TabsTrigger>
              </TabsList>
            
            <TabsContent value='transferencia'>
            <div className="border rounded overflow-hidden">
              <div className="max-h-[500px] overflow-auto">
                <table className="min-w-[1200px] table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N SOLICITAÇÃO
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ITEM
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CÓDIGO
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MARCA
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DESCRIÇÃO
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QTD
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Situação
                      </th>
                      {atendimento[0]?.status === 1 && (
                        <>
                          <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Valor de Compra</th>
                          <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Valor de Venda</th>
                          <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rentabilidade</th>
                        </>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AÇÃO
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.length > 0 ? (
                      items.map((item) => {
                        const filteredFornecedores = mockFornecedorData.filter(
                          (fornecedor) =>
                            fornecedor.atendimentoId === atendimentoId &&
                            fornecedor.itemId === item.id
                        );
                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {atendimento[0]?.status === 0
                                ? 'Em andamento'
                                : atendimento[0]?.status === 1
                                  ? 'Itens Aguardando Aprovação'
                                  : atendimento[0].status === 2
                                    ? 'Autorizada'
                                    : 'Entrega Mecânico'}
                            </td>

                            {atendimento[0]?.status === 1 && (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                              </>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ação</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                          Nenhum item aguardando aprovação
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </TabsContent>
            <TabsContent value='providencia'>
            <div className="border rounded overflow-hidden">
              <div className="max-h-[500px] overflow-auto">
                <table className="min-w-[1200px] table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N SOLICITAÇÃO
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ITEM
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CÓDIGO
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MARCA
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DESCRIÇÃO
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        QTD
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Situação
                      </th>
                      {atendimento[0]?.status === 1 && (
                        <>
                          <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Valor de Compra</th>
                          <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Valor de Venda</th>
                          <th className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rentabilidade</th>
                        </>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AÇÃO
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PROPOSTA FORNECEDORES
                      </th>
                      {filteredFornecedor.map((fornecedor) => (
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                          <div className='flex gap-2 justify-center items-center'>
                            {fornecedor.nomeFornecedor} - {fornecedor.fornecedorId} <Plane
                              size={20}
                              className="cursor-pointer"
                              onClick={() => {
                                const propostasFornecedor = mockFornecedorData.filter(
                                  (f) =>
                                    f.atendimentoId === atendimentoId &&
                                    f.nomeFornecedor === fornecedor.nomeFornecedor
                                );
                                setPropostasParaSelecionar(propostasFornecedor);
                                setSelecionarPropostasModalOpen(true);
                              }}
                            /><Trash size={20} color='red' /> <PlusCircle size={20} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.length > 0 ? (
                      items.map((item) => {
                        const filteredFornecedores = mockFornecedorData.filter(
                          (fornecedor) =>
                            fornecedor.atendimentoId === atendimentoId &&
                            fornecedor.itemId === item.id
                        );
                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {atendimento[0]?.status === 0
                                ? 'Em andamento'
                                : atendimento[0]?.status === 1
                                  ? 'Itens Aguardando Aprovação'
                                  : atendimento[0].status === 2
                                    ? 'Autorizada'
                                    : 'Entrega Mecânico'}
                            </td>

                            {atendimento[0]?.status === 1 && (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                              </>
                            )}

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ação</td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button onClick={() => handleFornecedorModalOpen(item.id, seletecFornecedorid)} variant="outline">
                                <Plus /> Proposta Fornecedor
                              </Button>
                            </td>

                            {filteredFornecedor.map((fornecedorUnico) => {
                              const propostasFornecedor = filteredFornecedores.filter(
                                (f) => f.nomeFornecedor === fornecedorUnico.nomeFornecedor
                              );

                              const algumaAprovada = propostasFornecedor.some((p) => p.aprovado && p.itemId === item.id);


                              return (
                                <td
                                  key={`${item.id}-${fornecedorUnico.nomeFornecedor}`}
                                  className={`text-sm text-gray-500 ${propostasFornecedor.some((p) => p.aprovado && p.itemId === item.id)
                                    ? "bg-green-100 border-green-500 border-2"
                                    : "bg-yellow-100"
                                    }`}
                                >
                                  {propostasFornecedor.length > 0 ? (
                                    <table className="w-full text-xs border border-gray-300">
                                      <thead>
                                        <tr>
                                          <th className="border px-2 py-1">QTD</th>
                                          <th className="border px-2 py-1">REFERÊNCIA</th>
                                          <th className="border px-2 py-1">VALOR UNITÁRIO</th>
                                          <th className="border px-2 py-1">VALOR TOTAL</th>
                                          <th className="border px-2 py-1">AÇÃO</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {propostasFornecedor.map((p, idx) => (
                                          <tr key={idx}>
                                            <td className="border px-2 py-1">{p.quantidade}</td>
                                            <td className="border px-2 py-1">{p.nomeFornecedor}</td>
                                            <td className="border px-2 py-1">{p.valor}</td>
                                            <td className="border px-2 py-1">
                                              {`R$ ${(parseFloat(p.valor) * parseFloat(p.quantidade)).toFixed(2)}`}
                                            </td>
                                            <td className="border px-2 py-1 text-center">

                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  ) : (
                                    <div className="flex justify-center py-2 text-sm text-gray-500 cursor-pointer">
                                      <PlusCircle onClick={() => handleFornecedorModalOpen(item.id, seletecFornecedorid)} />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                          Nenhum item aguardando aprovação
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <AdicionarItemsModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onAddItem={onAddItem}
      />
      <AddFornecedorModal
        isOpen={fornecedorModalOpen}
        onClose={() => setFornecedorModalOpen(false)}
        atendimentoId={atendimentoId}
        itemId={selectedItemId}
      />
      <MecanicoModal
        isOpen={isMecanicoModalOpen}
        onClose={() => setIsMecanicoModalOpen(false)}
        items={itensAprovados}
        atendimentoId={atendimentoId}
      />
      <SelecionarPropostasModal
        isOpen={selecionarPropostasModalOpen}
        onClose={() => setSelecionarPropostasModalOpen(false)}
        propostas={propostasParaSelecionar}
        onConfirm={handleConfirmarAprovacaoSelecionadas}
      />
      <div style={{ display: 'none' }}>
        <ApprovalPrintLayout
          ref={printRef}
          items={getPrintItems()}
          fornecedores={filteredFornecedor}
          atendimento={{
            id: Number(atendimento[0]?.id) || 0,
            observacao: '',
            condicaoPagamento: '',
            prazoEntrega: '',
            formaRemessa: '',
          }}
          dataHoraImpressao={dataHoraImpressao}
        />
      </div>
    </>
  );
};

export default ApprovalItemsModal;
