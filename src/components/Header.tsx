import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className}: HeaderProps) => {
 

  return (
    <header className={cn("w-full bg-marco-blue py-2 px-4 flex items-center justify-between", className)}>
      <div className="flex items-center">
        <div className="bg-marco-yellow py-2 px-4 rounded-sm flex items-center">
          <span className="text-marco-blue font-bold text-lg">MarcoDiesel</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
