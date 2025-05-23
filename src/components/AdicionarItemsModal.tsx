
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { ApprovalItem } from "@/pages/Index";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: ApprovalItem) => void;
}

export const AdicionarItemsModal = ({ isOpen, onClose, onAddItem }: AddItemModalProps) => {
  const [activeTab, setActiveTab] = React.useState("itens pendentes");
  const [formData, setFormData] = useState({
    codigo: '',
    marca: '',
    descricao: '',
    qtd: '1',
  });
  const [search, setSearch] = useState('');


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const mockAutopecasTransferencia = [
    {
      id: 1,
      validacao: "Em Transferência",
      descricao: "Filtro de Óleo",
      codPublico: "FO123",
      fabrica: "Fram",
      marca: "Fram",
      utilizacao: "Motor",
      categoria: "Filtros",
      grupo: "Lubrificação",
      disponivel: "Sim",
      qtd: 20,
      situacao: "Novo",
      status: 0,
    },
    {
      id: 2,
      validacao: "A Transferir",
      descricao: "Pastilha de Freio Dianteira",
      codPublico: "PF456",
      fabrica: "Bosch",
      marca: "Bosch",
      utilizacao: "Freios",
      categoria: "Pastilhas",
      grupo: "Sistema de Freios",
      disponivel: "Sim",
      qtd: 15,
      situacao: "Em estoque",
      status: 0,
    },
    {
      id: 3,
      validacao: "Em Transferência",
      descricao: "Amortecedor Traseiro",
      codPublico: "AT789",
      fabrica: "Cofap",
      marca: "Cofap",
      utilizacao: "Suspensão",
      categoria: "Amortecedores",
      grupo: "Suspensão",
      disponivel: "Não",
      qtd: 0,
      situacao: "Indisponível",
      status: 0,
    },
    {
      id: 4,
      validacao: "Em Transferência",
      descricao: "Bateria 60Ah",
      codPublico: "BT101",
      fabrica: "Moura",
      marca: "Moura",
      utilizacao: "Elétrica",
      categoria: "Baterias",
      grupo: "Sistema Elétrico",
      disponivel: "Sim",
      qtd: 5,
      situacao: "Novo",
      status: 0,
    },
    {
      id: 5,
      validacao: "Em Transferência",
      descricao: "Correia Dentada",
      codPublico: "CD202",
      fabrica: "Gates",
      marca: "Gates",
      utilizacao: "Motor",
      categoria: "Correias",
      grupo: "Distribuição",
      disponivel: "Sim",
      qtd: 8,
      situacao: "Novo",
      status: 0,
    },
  ];

  const mockAutopecasPendente = [
    {
      id: 1,
      validacao: "Pendente",
      descricao: "Filtro de Óleo",
      codPublico: "FO123",
      fabrica: "Fram",
      marca: "Fram",
      utilizacao: "Motor",
      categoria: "Filtros",
      grupo: "Lubrificação",
      disponivel: "Sim",
      qtd: 20,
      situacao: "Novo",
      status: 0,
    },
    {
      id: 2,
      validacao: "Pendente",
      descricao: "Pastilha de Freio Dianteira",
      codPublico: "PF456",
      fabrica: "Bosch",
      marca: "Bosch",
      utilizacao: "Freios",
      categoria: "Pastilhas",
      grupo: "Sistema de Freios",
      disponivel: "Sim",
      qtd: 15,
      situacao: "Em estoque",
      status: 0,
    },
    {
      id: 3,
      validacao: "Pendente",
      descricao: "Amortecedor Traseiro",
      codPublico: "AT789",
      fabrica: "Cofap",
      marca: "Cofap",
      utilizacao: "Suspensão",
      categoria: "Amortecedores",
      grupo: "Suspensão",
      disponivel: "Não",
      qtd: 0,
      situacao: "Indisponível",
      status: 0,
    },
    {
      id: 4,
      validacao: "Pendente",
      descricao: "Bateria 60Ah",
      codPublico: "BT101",
      fabrica: "Moura",
      marca: "Moura",
      utilizacao: "Elétrica",
      categoria: "Baterias",
      grupo: "Sistema Elétrico",
      disponivel: "Sim",
      qtd: 5,
      situacao: "Novo",
      status: 0,
    },
    {
      id: 5,
      validacao: "Pendente",
      descricao: "Correia Dentada",
      codPublico: "CD202",
      fabrica: "Gates",
      marca: "Gates",
      utilizacao: "Motor",
      categoria: "Correias",
      grupo: "Distribuição",
      disponivel: "Sim",
      qtd: 8,
      situacao: "Novo",
      status: 0,
    },
  ];
  const filteredItems = mockAutopecasTransferencia.filter((item) => item.descricao.includes(search));
  const filteredItemsPendentes = mockAutopecasPendente.filter((item) => item.descricao.includes(search));

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new item from form data
    const newItem: ApprovalItem = {
      id: `item-${Date.now()}`,
      itemEstoque: formData.codigo,
      descricao: formData.descricao,
      quantidade: formData.qtd,
      valorUnitario: '0',
      situacao: 'Aguardando',
      acao: 'Pendente',
    };

    // Add the item to the shared state
    onAddItem(newItem);

    // Reset form and close modal
    setFormData({
      codigo: '',
      marca: '',
      descricao: '',
      qtd: '1',
    });
    onClose();
  };

  const handleSelectCadastradoItem = (item: any) => {
    const newItem: ApprovalItem = {
      id: `item-${Date.now()}`,
      itemEstoque: item.codPublico,
      descricao: item.descricao,
      quantidade: '1',
      valorUnitario: '0',
      situacao: item.situacao,
      acao: 'Pendente',
    };
    onAddItem(newItem);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Adicionar Item</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="itens pendentes" value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-grow">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="itens pendentes">ITENS PENDENTES</TabsTrigger>
            <TabsTrigger value="transferencia">TRANSFERÊNCIA</TabsTrigger>
            <TabsTrigger value="providencia">ITENS | PROVIDÊNCIA DE COMPRA</TabsTrigger>
          </TabsList>
          {/* Área de conteúdo fixa, impedindo rolagem desnecessária */}
          <div className="flex-grow flex flex-col h-full overflow-hidden">
            <TabsContent value="itens pendentes" className="mt-0">
              <form className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-4">Selecione o item cadastrado:</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input onChange={(e) => setSearch(e.target.value)} id="searchItemGeneral" placeholder="Pesquisar item..." className="flex-grow" />
                    <Button type="button" className="bg-gray-300 hover:bg-gray-400 text-black px-4">
                      <Search />
                    </Button>
                  </div>
                  {/* Tabela com Campos de Pesquisa */}
                  <div className="border rounded-md overflow-auto max-h-72">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Validação</th>
                          <th className="border px-2 py-1">Descrição</th>
                          <th className="border px-2 py-1">Cód Público</th>
                          <th className="border px-2 py-1">Fábrica</th>
                          <th className="border px-2 py-1">Marca</th>
                          <th className="border px-2 py-1">Utilização</th>
                          <th className="border px-2 py-1">Categoria</th>
                          <th className="border px-2 py-1">Grupo</th>
                          <th className="border px-2 py-1">Disponível</th>
                          <th className="border px-2 py-1">Qtd</th>
                        </tr>
                        <tr>
                          {/* Campos de Pesquisa Individuais */}
                          <th className="border px-2 py-1"><Input id="searchValidacao" placeholder="Validaçao..." /></th>
                          <th className="border px-2 py-1"><Input id="searchDescricao" placeholder="Descrição..." /></th>
                          <th className="border px-2 py-1"><Input id="searchCodPublico" placeholder="Cód Publico..." /></th>
                          <th className="border px-2 py-1"><Input id="searchFabrica" placeholder="Fábrica..." /></th>
                          <th className="border px-2 py-1"><Input id="searchMarca" placeholder="Marca..." /></th>
                          <th className="border px-2 py-1"><Input id="searchUtilizacao" placeholder="Utilização..." /></th>
                          <th className="border px-2 py-1"><Input id="searchCategoria" placeholder="Categoria..." /></th>
                          <th className="border px-2 py-1"><Input id="searchGrupo" placeholder="Grupo..." /></th>
                          <th className="border px-2 py-1"><Input id="searchDisponivel" placeholder="Disponível..." /></th>
                          <th className="border px-2 py-1"><Input id="searchQtd" placeholder="Qtd..." /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItemsPendentes.length > 0 ? (
                          filteredItemsPendentes.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectCadastradoItem(item)}
                            >
                              <td className="border px-2 py-1">{item.validacao}</td>
                              <td className="border px-2 py-1">{item.descricao}</td>
                              <td className="border px-2 py-1">{item.codPublico}</td>
                              <td className="border px-2 py-1">{item.fabrica}</td>
                              <td className="border px-2 py-1">{item.marca}</td>
                              <td className="border px-2 py-1">{item.utilizacao}</td>
                              <td className="border px-2 py-1">{item.categoria}</td>
                              <td className="border px-2 py-1">{item.grupo}</td>
                              <td className="border px-2 py-1">{item.disponivel}</td>
                              <td className="border px-2 py-1">{item.qtd}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={11} className="text-center text-gray-500 py-2">
                              Nenhum item encontrado
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 uppercase"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </form>
            </TabsContent>
  
            {/* Aba CADASTRADO */}
            <TabsContent value="transferencia" className="mt-0">
              <form className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-4">Selecione o item cadastrado:</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input onChange={(e) => setSearch(e.target.value)} id="searchItemGeneral" placeholder="Pesquisar item..." className="flex-grow" />
                    <Button type="button" className="bg-gray-300 hover:bg-gray-400 text-black px-4">
                      <Search />
                    </Button>
                  </div>
                  {/* Tabela com Campos de Pesquisa */}
                  <div className="border rounded-md overflow-auto max-h-72">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Validação</th>
                          <th className="border px-2 py-1">Descrição</th>
                          <th className="border px-2 py-1">Cód Público</th>
                          <th className="border px-2 py-1">Fábrica</th>
                          <th className="border px-2 py-1">Marca</th>
                          <th className="border px-2 py-1">Utilização</th>
                          <th className="border px-2 py-1">Categoria</th>
                          <th className="border px-2 py-1">Grupo</th>
                          <th className="border px-2 py-1">Disponível</th>
                          <th className="border px-2 py-1">Qtd</th>
                        </tr>
                        <tr>
                          {/* Campos de Pesquisa Individuais */}
                          <th className="border px-2 py-1"><Input id="searchValidacao" placeholder="Validaçao..." /></th>
                          <th className="border px-2 py-1"><Input id="searchDescricao" placeholder="Descrição..." /></th>
                          <th className="border px-2 py-1"><Input id="searchCodPublico" placeholder="Cód Publico..." /></th>
                          <th className="border px-2 py-1"><Input id="searchFabrica" placeholder="Fábrica..." /></th>
                          <th className="border px-2 py-1"><Input id="searchMarca" placeholder="Marca..." /></th>
                          <th className="border px-2 py-1"><Input id="searchUtilizacao" placeholder="Utilização..." /></th>
                          <th className="border px-2 py-1"><Input id="searchCategoria" placeholder="Categoria..." /></th>
                          <th className="border px-2 py-1"><Input id="searchGrupo" placeholder="Grupo..." /></th>
                          <th className="border px-2 py-1"><Input id="searchDisponivel" placeholder="Disponível..." /></th>
                          <th className="border px-2 py-1"><Input id="searchQtd" placeholder="Qtd..." /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectCadastradoItem(item)}
                            >
                              <td className="border px-2 py-1">{item.validacao}</td>
                              <td className="border px-2 py-1">{item.descricao}</td>
                              <td className="border px-2 py-1">{item.codPublico}</td>
                              <td className="border px-2 py-1">{item.fabrica}</td>
                              <td className="border px-2 py-1">{item.marca}</td>
                              <td className="border px-2 py-1">{item.utilizacao}</td>
                              <td className="border px-2 py-1">{item.categoria}</td>
                              <td className="border px-2 py-1">{item.grupo}</td>
                              <td className="border px-2 py-1">{item.disponivel}</td>
                              <td className="border px-2 py-1">{item.qtd}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={11} className="text-center text-gray-500 py-2">
                              Nenhum item encontrado
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 uppercase"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="providencia" className="mt-0">
              <form className="flex flex-col">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-4">Selecione o item cadastrado:</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input onChange={(e) => setSearch(e.target.value)} id="searchItemGeneral" placeholder="Pesquisar item..." className="flex-grow" />
                    <Button type="button" className="bg-gray-300 hover:bg-gray-400 text-black px-4">
                      <Search />
                    </Button>
                  </div>
                  {/* Tabela com Campos de Pesquisa */}
                  <div className="border rounded-md overflow-auto max-h-72">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Validação</th>
                          <th className="border px-2 py-1">Descrição</th>
                          <th className="border px-2 py-1">Cód Público</th>
                          <th className="border px-2 py-1">Fábrica</th>
                          <th className="border px-2 py-1">Marca</th>
                          <th className="border px-2 py-1">Utilização</th>
                          <th className="border px-2 py-1">Categoria</th>
                          <th className="border px-2 py-1">Grupo</th>
                          <th className="border px-2 py-1">Disponível</th>
                          <th className="border px-2 py-1">Qtd</th>
                          <th className="border px-2 py-1">Situação</th>
                        </tr>
                        <tr>
                          {/* Campos de Pesquisa Individuais */}
                          <th className="border px-2 py-1"><Input id="searchValidacao" placeholder="Validaçao..." /></th>
                          <th className="border px-2 py-1"><Input id="searchDescricao" placeholder="Descrição..." /></th>
                          <th className="border px-2 py-1"><Input id="searchCodPublico" placeholder="Cód Publico..." /></th>
                          <th className="border px-2 py-1"><Input id="searchFabrica" placeholder="Fábrica..." /></th>
                          <th className="border px-2 py-1"><Input id="searchMarca" placeholder="Marca..." /></th>
                          <th className="border px-2 py-1"><Input id="searchUtilizacao" placeholder="Utilização..." /></th>
                          <th className="border px-2 py-1"><Input id="searchCategoria" placeholder="Categoria..." /></th>
                          <th className="border px-2 py-1"><Input id="searchGrupo" placeholder="Grupo..." /></th>
                          <th className="border px-2 py-1"><Input id="searchDisponivel" placeholder="Disponível..." /></th>
                          <th className="border px-2 py-1"><Input id="searchQtd" placeholder="Qtd..." /></th>
                          <th className="border px-2 py-1"><Input id="searchSituação" placeholder="Situação..." /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelectCadastradoItem(item)}
                            >
                              <td className="border px-2 py-1">{item.validacao}</td>
                              <td className="border px-2 py-1">{item.descricao}</td>
                              <td className="border px-2 py-1">{item.codPublico}</td>
                              <td className="border px-2 py-1">{item.fabrica}</td>
                              <td className="border px-2 py-1">{item.marca}</td>
                              <td className="border px-2 py-1">{item.utilizacao}</td>
                              <td className="border px-2 py-1">{item.categoria}</td>
                              <td className="border px-2 py-1">{item.grupo}</td>
                              <td className="border px-2 py-1">{item.disponivel}</td>
                              <td className="border px-2 py-1">{item.qtd}</td>
                              <td className="border px-2 py-1">{item.situacao}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={11} className="text-center text-gray-500 py-2">
                              Nenhum item encontrado
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <Button
                  type="button"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 uppercase"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
