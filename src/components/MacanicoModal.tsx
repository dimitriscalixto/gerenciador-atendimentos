import type { Servicos } from "@/types/servicos";
import { useMockData } from "./contexts/atendimentoContext";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { ApprovalItem } from "@/pages/Index";
import { useEffect, useState } from "react";

interface MecanicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ApprovalItem[];
  atendimentoId: number;
}

export const MecanicoModal = ({ isOpen, onClose, items, atendimentoId }: MecanicoModalProps) => {
  const { mockData, setMockData } = useMockData();
  const [servicos, setServicos] = useState<Servicos[]>([]);

  const handleEnviar = () => {
    const atendimento = mockData.map((atendimento) =>
      parseInt(atendimento.id) === atendimentoId
        ? { ...atendimento, status: 4 }
        : atendimento
    );
    setMockData(atendimento)
  }
  useEffect(() => {
    if (isOpen) {
      const novosServicos = items.map((item) => ({
        itemId: item.id,
        descricao: item.descricao,
        valorServico: "",
        valorServicoMecanico: "",
      }));
      setServicos(novosServicos);
    }
  }, [items, isOpen]);

  const handleChange = (index: number, field: string, value: string) => {
    const novosServicos = [...servicos];
    novosServicos[index] = { ...novosServicos[index], [field]: value };
    setServicos(novosServicos);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Serviços para o Mecânico</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Serviço</th>
                <th className="px-4 py-2 border">Valor do Serviço</th>
                <th className="px-4 py-2 border">Valor do Serviço do Mecânico</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico, index) => (
                <tr key={servico.itemId}>
                  <td className="px-4 py-2 border">{servico.descricao}</td>
                  <td className="px-4 py-2 border">
                    <Input
                      type="number"
                      placeholder="R$"
                      value={servico.valorServico}
                      onChange={(e) => handleChange(index, "valorServico", e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <Input
                      type="number"
                      placeholder="R$"
                      value={servico.valorServicoMecanico}
                      onChange={(e) => handleChange(index, "valorServicoMecanico", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="mt-4" onClick={() => handleEnviar()}>Enviar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
