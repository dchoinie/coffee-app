import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-amber-800 px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <Plus className="h-5 w-5" />
      <span>Add New Brew</span>
    </Button>
  );
}
