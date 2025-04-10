
import React, { useState } from 'react';
import { ArrowRight, ArrowDown, Plus, PlusCircle } from 'lucide-react';
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
  const filteredFornecedor = mockFornecedorData.filter((fornecedor) => fornecedor.atendimentoId === atendimentoId);
  const atendimento = mockData.filter((atendimento) => parseInt(atendimento.id) === atendimentoId);
  const [seletecFornecedorid, setSelectedFornecedorId] = useState(null);
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

  const handleAprovarCliente = (atendimentoId: number) => {
    const atendimento = mockData.map((atendimento) =>
      parseInt(atendimento.id) === atendimentoId
        ? { ...atendimento, status: 2 }
        : atendimento
    );
    setMockData(atendimento);
  }
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-[96vw] w-full max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">{atendimento[0]?.status === 0 ? 'Em andamento' : atendimento[0]?.status === 1 ? 'Itens Aguardando Aprovação' : 'Item em Aprovação' }</DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <div className="flex gap-2 mb-4">
              <Button
                className="text-gray-800 font-medium rounded flex items-center gap-2"
                variant="outline"
                onClick={() => setIsAddItemModalOpen(true)}
              >
                Adicionar Item
              </Button>
              {atendimento[0]?.status === 0 ? 
              <Button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              variant="outline"
              onClick={() => handleAprovarAtendimento(atendimentoId)}
            >
              Concluir / Enviar para Aprovação
            </Button>
              : <Button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
                variant="outline"
                onClick={() => handleAprovarCliente(atendimentoId)}
              >
                Aprovar / Cliente
              </Button>
              }
            </div>

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
                          {fornecedor.nomeFornecedor}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.length > 0 ? (
                      items.map((item) => {
                        const filteredFornecedores = mockFornecedorData.filter(
                          (fornecedor) => fornecedor.atendimentoId === atendimentoId && fornecedor.itemId === item.id
                        );

                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>

                            {atendimento[0]?.status === 1 && (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">20</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10</td>
                              </>
                            )}

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ação</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button onClick={() => handleFornecedorModalOpen(item.id, null)} variant='outline'>
                                <Plus /> Proposta Fornecedor
                              </Button>
                            </td>

                            <td className="text-sm text-gray-500 bg-yellow-100 w-full h-full" colSpan={filteredFornecedor.length > 0 ? 1 : filteredFornecedor.length || 1}>
                              {filteredFornecedores.length > 0 ? (
                                <table className="w-full flex-1 text-xs border border-gray-300">
                                  <thead>
                                    <tr>
                                      <th className="px-2 py-1 border border-gray-300">QTD</th>
                                      <th className="px-2 py-1 border border-gray-300">REFERÊNCIA</th>
                                      <th className="px-2 py-1 border border-gray-300">VALOR UNITÁRIO</th>
                                      <th className="px-2 py-1 border border-gray-300">VALOR TOTAL</th>
                                      <th className="px-2 py-1 border border-gray-300">AÇÃO</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredFornecedores.map((fornecedor) => (
                                      <tr key={fornecedor.valor} className="h-full">
                                        <td className="px-2 py-2 border border-gray-300">{fornecedor.quantidade}</td>
                                        <td className="px-2 py-2 border border-gray-300">{fornecedor.nomeFornecedor}</td>
                                        <td className="px-2 py-2 border border-gray-300">{fornecedor.valor}</td>
                                        <td className="px-2 py-2 border border-gray-300">R$ 12,23</td>
                                        <td className="px-2 py-2 border border-gray-300 text-center">
                                          <button className="text-gray-500">
                                            <Plus size={12} />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <div className="flex justify-end py-2 text-sm text-gray-500 cursor-pointer mr-4"><PlusCircle onClick={() => handleFornecedorModalOpen(item.id, seletecFornecedorid)} /></div>
                              )}
                            </td>

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
    </>
  );
};

export default ApprovalItemsModal;
