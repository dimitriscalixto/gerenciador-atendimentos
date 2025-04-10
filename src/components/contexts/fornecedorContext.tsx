import type { Fornecedor } from "@/types/fornecedor"
import { createContext, useContext, useState, type ReactNode } from "react";

type MockDataContextType = {
  mockFornecedorData: Fornecedor[];
  setMockFornecedorData: React.Dispatch<React.SetStateAction<Fornecedor[]>>;
}

const MockFornecedorDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockFornecedorDataProvider = ({ children }: { children: ReactNode }) => {
  const [mockFornecedorData, setMockFornecedorData] = useState<Fornecedor[]>([]);

  return (
    <MockFornecedorDataContext.Provider value={{ mockFornecedorData, setMockFornecedorData }}>
      {children}
    </MockFornecedorDataContext.Provider>
  )
}

export const useMockFornecedorData = (): MockDataContextType => {
  const context = useContext(MockFornecedorDataContext);
  if (!context) throw new Error("useMockData deve ser usado dentro de MockDataProvider");
  return context;
}