
import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AdicionarItemsModal } from './AdicionarItemsModal';
import { ApprovalItem } from '@/pages/Index';

interface ApprovalItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ApprovalItem[];
  onAddItem: (item: ApprovalItem) => void;
  atendimentoId?: string;
}

const ApprovalItemsModal = ({ isOpen, onClose, items, onAddItem, atendimentoId }: ApprovalItemsModalProps) => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Itens Aguardando Aprovação</DialogTitle>
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
              <Button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
                variant="outline"
              >
                Concluir / Enviar para Cotação (Compras Oficinas)
              </Button>
            </div>

            <div className="border rounded overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item Estoque
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantidade
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor Unitário
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Situação
                        <ArrowDown className="inline ml-1 w-3 h-3 text-gray-400" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.length > 0 ? (
                      items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.itemEstoque}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.valorUnitario}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.situacao}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.acao}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
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
    </>
  );
};

export default ApprovalItemsModal;
