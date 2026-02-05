import { ChevronDown } from "lucide-react";

interface ScrollArrowProps {
  onClick: () => void;
}

const ScrollArrow = ({ onClick }: ScrollArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group cursor-pointer"
    >
      <span className="text-sm font-mono tracking-widest uppercase">
        How it works
      </span>
      <div className="animate-bounce">
        <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </div>
    </button>
  );
};

export default ScrollArrow;
