
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AdicionarItemsModal } from "./AdicionarItemsModal";


interface ApprovalItemsModalProps {
  isOpen: boolean;
  onClose?: () => void;
}
interface ApprovalItem {
  id: string;
  itemEstoque: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  situacao: string;
  acao: string;
}

const mockApprovalItems: ApprovalItem[] = Array.from({ length: 4 }, (_, i) => ({
  id: `item-${i + 1}`,
  itemEstoque: `Nome Item Estoque ${i + 1}`,
  descricao: `Descrição ${i + 1}`,
  quantidade: i + 1,
  valorUnitario: i * 10,
  situacao: `Situação ${i + 1}`,
  acao: 'Botão Teste',
}));

export const AprovarItemsModal = ({ isOpen, onClose }: ApprovalItemsModalProps) => {
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
              <Button onClick={() => setIsAddItemModalOpen(true)}
                className="text-gray-800 font-medium rounded flex items-center gap-2"
                variant="outline"
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

            <div className="border rounded overflow-hidden w-full">
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
      <AdicionarItemsModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
      />
    </>
  )
}