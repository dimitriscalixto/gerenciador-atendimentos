
import React from 'react';
import { Check, X, ArrowRight, ArrowDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApprovalItem {
  id: string;
  itemEstoque: string;
  descricao: string;
  quantidade: string;
  valorUnitario: string;
  situacao: string;
  acao: string;
}

interface ApprovalItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  atendimentoId?: string;
}

const mockApprovalItems: ApprovalItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `item-${i + 1}`,
  itemEstoque: `Bold text column`,
  descricao: `Regular text column`,
  quantidade: `Regular text column`,
  valorUnitario: `Regular text column`,
  situacao: `Cliente Teste`,
  acao: `Cliente Teste`,
}));

const ApprovalItemsModal = ({ isOpen, onClose, atendimentoId }: ApprovalItemsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Itens Aguardando Aprovação</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <div className="flex justify-between mb-4">
            <Button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              variant="outline"
            >
              Concluir / Enviar para Cotação (Compras Oficinas)
            </Button>
            
            <div className="flex items-center">
              <Button 
                className="text-gray-800 font-medium rounded flex items-center gap-2"
                variant="outline"
              >
                Adicionar Item
              </Button>
              <ArrowRight className="ml-2 text-gray-400 w-6 h-6" />
            </div>
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
                  {mockApprovalItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.itemEstoque}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.valorUnitario}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.situacao}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.acao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalItemsModal;
