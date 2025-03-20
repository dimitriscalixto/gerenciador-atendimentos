
import React, { useState } from 'react';
import Header from '@/components/Header';
import DataTable, { TableRow } from '@/components/DataTable';
import { Plus, Search } from 'lucide-react';
import AddAtendimentoModal from '@/components/AddAtendimentoModal';

const Index = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const handleAddAtendimento = (atendimento: TableRow) => {
    // Criar um novo objeto de linha para a tabela
    const newRow: TableRow = {
      id: `new-${Date.now()}`,
      notificacao: atendimento.notificacao || '',
      atendimento: atendimento.atendimento || '',
      os: atendimento.os || '',
      placa: atendimento.placa || '',
      cliente: atendimento.cliente || '',
      solicitante: atendimento.solicitante || '',
      dataCriada: atendimento.dataCriada || new Date().toLocaleDateString(),
      emAndamento: atendimento.emAndamento || false,
      aguardandoAprovacao: atendimento.aguardandoAprovacao || false,
      autorizada: atendimento.autorizada || false,
      envioMecanico: atendimento.envioMecanico || false,
      faturamento: atendimento.faturamento || false,
    };
    console.log('row :', newRow);
    setTableData(prev => [newRow, ...prev]);
    console.log(tableData)
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAtendimentoSelect = (atendimento: TableRow) => {
    console.log(atendimento);
    handleAddAtendimento(atendimento)
    handleCloseModal();
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 animate-fade-in">
      <Header onAddAtendimento={handleAddAtendimento} />

      <main className="flex-1 w-full p-4 md:p-6">
        <div className="max-w-full mx-auto">
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-2xl font-medium text-gray-800">Solicitação Compra Oficina</h1>
          </div>
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar..."
                className="search-bar w-full px-4 py-2 rounded-md border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-marco-blue/20 pl-10 animate-fade-in"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className='inline-flex items-center gap-2 bg-marco-blue px-4 py-2 rounded-md min-w-[200px] cursor-pointer' onClick={handleOpenModal}>
            <p className='mr-2 text-white inline'>Adicionar Solicitação</p>
            <Plus className="w-4 h-4 text-white transition-transform duration-200" />
          </div>

          <AddAtendimentoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelectAtendimento={handleAtendimentoSelect}
          />
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <DataTable tableData={tableData} />
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 bg-white border-t text-center text-gray-500 text-sm">
        <p>© 2025 MarcoDiesel. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
