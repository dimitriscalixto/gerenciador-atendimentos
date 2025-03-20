
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full bg-marco-blue py-2 px-4 flex items-center justify-between", className)}>
      <div className="flex items-center">
        <div className="bg-marco-yellow py-2 px-4 rounded-sm flex items-center">
          <span className="text-marco-blue font-bold text-lg">MarcoDiesel</span>
        </div>
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
      
      <div>
        <button 
          className="bg-white hover:bg-gray-50 p-2 rounded-full transition-all duration-200 
                   hover:shadow-md group flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-marco-blue group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </header>
  );
};

export default Header;
