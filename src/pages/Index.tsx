
import React, { useState } from 'react';
import Header from '@/components/Header';
import DataTable, { TableRow } from '@/components/DataTable';
import { Plus, Search } from 'lucide-react';
import AddAtendimentoModal from '@/components/AddAtendimentoModal';
import ApprovalItemsModal from '@/components/ApprovalItemsModal';

// Interface for the approval items
export interface ApprovalItem {
  id: string;
  itemEstoque: string;
  descricao: string;
  quantidade: string;
  valorUnitario: string;
  situacao: string;
  acao: string;
}

const Index = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  
  // Shared state for approval items
  const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([]);

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
      emAndamento: true, // Set to true by default for new entries
      aguardandoAprovacao: false,
      autorizada: false,
      envioMecanico: false,
      faturamento: false,
    };
    console.log('row :', newRow);
    setTableData(prev => [newRow, ...prev]);
    console.log(tableData)
  };

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

  // Function to handle opening the approval modal
  const handleOpenApprovalModal = () => {
    setIsApprovalModalOpen(true);
  };

  // Function to handle closing the approval modal
  const handleCloseApprovalModal = () => {
    setIsApprovalModalOpen(false);
  };

  // Function to add a new approval item
  const handleAddApprovalItem = (newItem: ApprovalItem) => {
    setApprovalItems(prevItems => [newItem, ...prevItems]);
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

          <div className='inline-flex items-center gap-2 bg-marco-blue px-4 py-2 rounded-md min-w-[200px] cursor-pointer ml-4' onClick={handleOpenApprovalModal}>
            <p className='mr-2 text-white inline'>Ver Itens Aguardando Aprovação</p>
            <Plus className="w-4 h-4 text-white transition-transform duration-200" />
          </div>

          <AddAtendimentoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSelectAtendimento={handleAtendimentoSelect}
          />

          <ApprovalItemsModal
            isOpen={isApprovalModalOpen}
            onClose={handleCloseApprovalModal}
            items={approvalItems}
            onAddItem={handleAddApprovalItem}
          />

          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <DataTable 
              tableData={tableData} 
              onApprovalClick={handleOpenApprovalModal} 
            />
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
