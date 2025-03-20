
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface TableRow {
  id: string;
  notificacao: string;
  atendimento: string;
  os: string;
  placa: string;
  cliente: string;
  solicitante: string;
  dataCriada: string;
  emAndamento: boolean;
  aguardandoAprovacao: boolean;
  autorizada: boolean;
  envioMecanico: boolean;
  faturamento: boolean;
}

const mockData: TableRow[] = Array.from({ length: 15 }, (_, i) => ({
  id: `row-${i + 1}`,
  notificacao: `Notificação ${i + 1}`,
  atendimento: `Atendimento ${i + 1}`,
  os: `OS ${i + 101}`,
  placa: `Placa ${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i + 5) % 26))}${Math.floor(Math.random() * 9000) + 1000}`,
  cliente: `Cliente Teste`,
  solicitante: `Solicitante Teste`,
  dataCriada: `${20 + (i % 10)}/03/2025`,
  emAndamento: Math.random() > 0.3,
  aguardandoAprovacao: Math.random() > 0.3,
  autorizada: Math.random() > 0.5,
  envioMecanico: false,
  faturamento: false,
}));

interface DataTableProps {
  className?: string;
  onAddRow?: (row: TableRow) => void;
}

const DataTable = ({ className, onAddRow }: DataTableProps) => {
  const [data, setData] = useState<TableRow[]>(mockData);
  
  // Método para adicionar uma nova linha à tabela
  const addRow = (newRow: TableRow) => {
    setData(prevData => [newRow, ...prevData]);
    if (onAddRow) {
      onAddRow(newRow);
    }
  };
  
  const StatusIcon = ({ status }: { status: boolean }) => {
    if (status) {
      return (
        <div className="flex justify-center">
          <div className="status-icon bg-marco-success/10 p-1 rounded-full">
            <Check className="w-4 h-4 text-marco-success" />
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        <div className="status-icon bg-marco-error/10 p-1 rounded-full">
          <X className="w-4 h-4 text-marco-error" />
        </div>
      </div>
    );
  };
  
  const headerClasses = "py-3 px-4 text-sm font-medium text-gray-700 border-b";
  const cellClasses = "py-3 px-4 text-sm text-gray-600 border-b";

  return (
    <div className={cn("w-full overflow-hidden rounded-md animate-fade-in", className)}>
      <div className="data-table-container overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className={headerClasses}>N Notificação</th>
              <th className={headerClasses}>Atendimento</th>
              <th className={headerClasses}>O.S.</th>
              <th className={headerClasses}>Placa</th>
              <th className={headerClasses}>Cliente</th>
              <th className={headerClasses}>Solicitante</th>
              <th className={headerClasses}>Data Criada</th>
              <th className={headerClasses}>Em Andamento</th>
              <th className={headerClasses}>Aguardando Aprovação</th>
              <th className={headerClasses}>Autorizada</th>
              <th className={headerClasses}>Entrega Mecânico</th>
              <th className={headerClasses}>Faturamento</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr 
                key={row.id} 
                className="table-row border-b border-gray-100 last:border-0 group hover:bg-gray-50"
              >
                <td className={cellClasses}>{row.notificacao}</td>
                <td className={cellClasses}>{row.atendimento}</td>
                <td className={cellClasses}>{row.os}</td>
                <td className={cellClasses}>{row.placa}</td>
                <td className={cellClasses}>{row.cliente}</td>
                <td className={cellClasses}>{row.solicitante}</td>
                <td className={cellClasses}>{row.dataCriada}</td>
                <td className={cellClasses}>
                  <StatusIcon status={row.emAndamento} />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.aguardandoAprovacao} />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.autorizada} />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.envioMecanico} />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.faturamento} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
