import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMockFornecedorData } from "./contexts/fornecedorContext";


interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  atendimentoId: number;
  itemId: string;
}

export const AddFornecedorModal = ({ isOpen, onClose, atendimentoId, itemId }: AddItemModalProps) => {
  const [quantidade, setQuantidade] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [valorSemImposto, setValorSemImposto] = useState('');
  const { mockFornecedorData, setMockFornecedorData } = useMockFornecedorData();
  const novoFornecedorId = Math.max(0, ...mockFornecedorData.map(f => f.fornecedorId || 0)) + 1;
  const handleAddFornecedor = (e: React.FormEvent) => {
    e.preventDefault();
    const newFornecedor = { atendimentoId, itemId, quantidade, valor: valorSemImposto, nomeFornecedor: fornecedor, fornecedorId: novoFornecedorId};
    setMockFornecedorData((prevData) => [...prevData, newFornecedor]);
  }
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Adicionar Fornecedor Para o Atendimento {atendimentoId} e Para o item {itemId}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col" onSubmit={handleAddFornecedor}>
          <div className="space-y-4 mb-4">
            <div>
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input id="fornecedor" value={fornecedor} onChange={e => setFornecedor(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input id="quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="valorSemImposto">Valor sem Imposto</Label>
              <Input id="valorSemImposto" value={valorSemImposto} onChange={e => setValorSemImposto(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 py-2">
            Adicionar Proposta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}