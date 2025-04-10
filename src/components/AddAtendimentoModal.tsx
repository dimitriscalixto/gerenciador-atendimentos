
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useMockData } from './contexts/atendimentoContext';

interface Atendimento {
  id: string;
  notificacao: string;
  atendimento: string;
  os: string;
  placa: string;
  cliente: string;
  solicitante: string;
  dataCriada: string;
  status: number;
}
interface AddAtendimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAtendimento: (atendimento: Atendimento) => void;
}

const AddAtendimentoModal = ({ isOpen, onClose, onSelectAtendimento }: AddAtendimentoModalProps) => {
  const { mockData, setMockData } = useMockData(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<Atendimento[]>([]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredResults([]); // Ou null para evitar o erro de iteração
      return;
    }

    const results = mockData.filter(item =>
      item.atendimento.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredResults(results);
  };

  const handleSelectItem = (atendimento: Atendimento) => {
    onSelectAtendimento({
      ...atendimento,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Atendimento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Digite o número do atendimento para buscar e adicionar à tabela.
          </p>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Command className="rounded-lg border shadow-md">
                <CommandInput
                  placeholder="Buscar número de atendimento..."
                  value={searchQuery}
                  onValueChange={handleSearch}
                />

                <CommandList>
                  {/* Mostra "Nenhum resultado encontrado" quando filteredResults for um array vazio */}
                  {filteredResults.length === 0 && searchQuery.trim() !== '' && (
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                  )}

                  {/* Exibe os resultados quando houver itens */}
                  {filteredResults.length > 0 && (
                    <CommandGroup heading="Resultados">
                      {filteredResults.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleSelectItem(item)}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{item.atendimento}</span>
                            <span className="text-xs text-gray-500">
                              {item.placa} - {item.cliente}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAtendimentoModal;
