import { Atendimento } from "@/types/atendimento";
import { createContext, useContext, useState, ReactNode } from "react";

type MockDataContextType = {
  mockData: Atendimento[];
  setMockData: React.Dispatch<React.SetStateAction<Atendimento[]>>;
};

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const [mockData, setMockData] = useState<Atendimento[]>(Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    notificacao: `Solicitação ${i + 1}`,
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
    status: 0,
  })));

  return (
    <MockDataContext.Provider value={{ mockData, setMockData }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = (): MockDataContextType => {
  const context = useContext(MockDataContext);
  if (!context) throw new Error("useMockData deve ser usado dentro de MockDataProvider");
  return context;
};
