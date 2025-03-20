
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem?: (item: any) => void;
}

const AddItemModal = ({ isOpen, onClose, onAddItem }: AddItemModalProps) => {
  const [activeTab, setActiveTab] = React.useState("manual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // You would collect form data and pass it to onAddItem
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Adicionar Item</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger 
              value="manual" 
              className={cn(
                "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none",
                "data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              )}
            >
              MANUAL
            </TabsTrigger>
            <TabsTrigger 
              value="cadastrado" 
              className={cn(
                "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none",
                "data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              )}
            >
              CADASTRADO
            </TabsTrigger>
            <TabsTrigger 
              value="providencia" 
              className={cn(
                "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none",
                "data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              )}
            >
              Providência de Compra
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="mt-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-4">Preencha os dados do item abaixo:</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="codigo">Código *</Label>
                    <Input id="codigo" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="marca">Marca *</Label>
                    <Input id="marca" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="descricao">Descrição *</Label>
                    <Input id="descricao" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="qtd">Qtd *</Label>
                    <Input id="qtd" type="number" required />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 uppercase"
              >
                Adicionar Item
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="cadastrado" className="mt-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-4">Selecione o item cadastrado:</h3>
                
                <div className="space-y-4">
                  {/* Content for CADASTRADO tab */}
                  <div>
                    <Label htmlFor="searchItem">Buscar item</Label>
                    <Input id="searchItem" placeholder="Digite para buscar..." />
                  </div>
                  
                  {/* More fields would go here */}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 uppercase"
              >
                Adicionar Item
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="providencia" className="mt-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-4">Providência de Compra:</h3>
                
                <div className="space-y-4">
                  {/* Content for Providência de Compra tab */}
                  <div>
                    <Label htmlFor="compraItem">Item para compra</Label>
                    <Input id="compraItem" />
                  </div>
                  
                  {/* More fields would go here */}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 uppercase"
              >
                Adicionar Item
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
