
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface Atendimento {
  id: string;
  notificacao: string;
  atendimento: string;
  os: string;
  placa: string;
  cliente: string;
  solicitante: string;
  dataCriada: string;
}

// Dados simulados para teste
const mockAtendimentos: Atendimento[] = Array.from({ length: 5 }, (_, i) => ({
  id: `atend-${i + 1}`,
  notificacao: `Notificação ${i + 101}`,
  atendimento: `${100000 + i}`,
  os: `OS ${i + 201}`,
  placa: `Placa ${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i + 5) % 26))}${Math.floor(Math.random() * 9000) + 1000}`,
  cliente: `Cliente ${i + 1}`,
  solicitante: `Solicitante ${i + 1}`,
  dataCriada: `${10 + (i % 20)}/04/2025`,
}));

interface AddAtendimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAtendimento: (atendimento: Atendimento) => void;
}

const AddAtendimentoModal = ({ isOpen, onClose, onSelectAtendimento }: AddAtendimentoModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<Atendimento[]>([]);
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    
    if (value.trim() === '') {
      setFilteredResults([]);
      return;
    }
    
    // Filtrar os atendimentos baseados na consulta
    const results = mockAtendimentos.filter(item => 
      item.atendimento.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredResults(results);
  };

  const handleSelectItem = (atendimento: Atendimento) => {
    onSelectAtendimento({
      ...atendimento,
      emAndamento: true,
      aguardandoAprovacao: false,
      autorizada: false,
      envioMecanico: false,
      faturamento: false
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
                
                {filteredResults.length > 0 && (
                  <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
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
                  </CommandList>
                )}
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
