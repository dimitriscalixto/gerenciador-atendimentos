
import React, { useState } from 'react';
import { Check, Hourglass, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import ApprovalItemsModal from './ApprovalItemsModal';
import type { Atendimento } from '@/types/atendimento';
import { useMockData } from './contexts/atendimentoContext';





interface DataTableProps {
  className?: string;
  onAddRow?: (row: Atendimento) => void;
  tableData: Atendimento[];
  onApprovalClick?: (rowId: number) => void;
}

const DataTable = ({ className, onAddRow, tableData, onApprovalClick }: DataTableProps) => {
  const { mockData } = useMockData();
  const [isAprovarModalOpen, setIsAprovarModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const tableDataAtualizado = tableData.map(row => {
    const atualizado = mockData.find((mock) => mock.id === row.id);
    return atualizado ?? row;
  });
  const handleOpenAprovarItemModal = (rowId: number) => {
    setSelectedRowId(rowId);
    if (onApprovalClick) {
      onApprovalClick(rowId); // aqui você passa o id
    }
  };

  const StatusIcon = ({ status, rowId, columnType, atendimentoId}: { status: number, rowId: string, columnType: string, atendimentoId: number}) => {
    const handleClick = () => {
        handleOpenAprovarItemModal(atendimentoId);
    };
    console.log(rowId)
    if (parseInt(rowId) === status) {
      return (
        <div className="flex justify-center">
          <div className="status-icon bg-gray-800/10 p-1 rounded-full cursor-pointer" onClick={handleClick}>
            <Hourglass className="w-4 h-4 text-black" />
          </div>
        </div>
      );
    }
    if(status > parseInt(rowId))
    return (
    <div className="flex justify-center">
      <div className="status-icon p-1 bg-marco-success/10 rounded-full cursor-pointer">
        <Check className="w-4 h-4 text-marco-success" />
      </div>
    </div>
    )

    return (
      <div className="flex justify-center">
      <div className="status-icon  bg-marco-error/10 p-1 rounded-full cursor-pointer">
        <X className="w-4 h-4 text-marco-error" />
      </div>
    </div>
    )

  }
  const headerClasses = "py-3 px-4 text-sm font-medium text-gray-700 border-b";
  const cellClasses = "py-3 px-4 text-sm text-gray-600 border-b";
  return (
    <div className={cn("w-full overflow-hidden rounded-md animate-fade-in", className)}>
      <div className="data-table-container overflow-x-auto">
        <table className="min-w-full bg-white shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className={headerClasses}>N Solicitação</th>
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
            {tableDataAtualizado.map((row) => (
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
                  <StatusIcon status={row.status} rowId={'0'} atendimentoId={parseInt(row.id)} columnType="emAndamento" />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.status} rowId={'1'} atendimentoId={parseInt(row.id)} columnType="aguardandoAprovacao" />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.status} rowId={'2'} atendimentoId={parseInt(row.id)} columnType="autorizada" />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.status} rowId={'3'} atendimentoId={parseInt(row.id)} columnType="envioMecanico" />
                </td>
                <td className={cellClasses}>
                  <StatusIcon status={row.status} rowId={'4'} atendimentoId={parseInt(row.id)}columnType="faturamento" />
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
