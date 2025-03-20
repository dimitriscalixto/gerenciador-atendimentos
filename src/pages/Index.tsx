
import React, { useState } from 'react';
import Header from '@/components/Header';
import DataTable, { TableRow } from '@/components/DataTable';

const Index = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const handleAddAtendimento = (atendimento: any) => {
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
    
    setTableData(prev => [newRow, ...prev]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 animate-fade-in">
      <Header onAddAtendimento={handleAddAtendimento} />
      
      <main className="flex-1 w-full p-4 md:p-6">
        <div className="max-w-full mx-auto">
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Gerenciamento de ordens de serviço</p>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <DataTable />
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
