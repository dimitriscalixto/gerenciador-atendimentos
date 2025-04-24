import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Fornecedor } from '@/types/fornecedor';

interface SelecionarPropostasModalProps {
  isOpen: boolean;
  onClose: () => void;
  propostas: Fornecedor[]; // já deve vir com itemId e fornecedor fixos
  onConfirm: (selecionadas: Fornecedor[]) => void;
}

export const SelecionarPropostasModal = ({
  isOpen,
  onClose,
  propostas,
  onConfirm,
}: SelecionarPropostasModalProps) => {
  const [selecionadas, setSelecionadas] = useState<Fornecedor[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSelecionadas([]); // resetar seleção ao abrir
    }
  }, [isOpen]);

  const toggleProposta = (proposta: Fornecedor) => {
    const jaSelecionada = selecionadas.some(
      (p) => p.itemId === proposta.itemId && p.fornecedorId === proposta.fornecedorId
    );

    if (jaSelecionada) {
      setSelecionadas((prev) =>
        prev.filter(
          (p) =>
            !(
              p.itemId === proposta.itemId &&
              p.fornecedorId === proposta.fornecedorId
            )
        )
      );
    } else {
      setSelecionadas((prev) => [...prev, proposta]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Selecionar Propostas para Aprovação</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
          {propostas.map((p, idx) => {
            const checked = selecionadas.some(
              (s) => s.itemId === p.itemId && s.fornecedorId === p.fornecedorId
            );

            return (
              <div
                key={idx}
                className="flex justify-between items-center border px-3 py-2 rounded"
              >
                <div>
                  <div className="text-sm font-medium">
                    {p.itemId} — Qtd: {p.quantidade} — R$ {p.valor}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleProposta(p)}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm(selecionadas);
              onClose();
            }}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
