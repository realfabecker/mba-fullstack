import { Button } from "@/components/ui/button.tsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        <Skeleton className={"h-5 w-[128px]"} />
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          <Skeleton className={"h-5 w-[72px]"} />
        </div>
        <div className="flex items-center gap-2">
          <Button disabled variant="outline" className="h-8 w-8 p-0">
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" disabled>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" disabled>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" disabled>
            <ChevronsRight className="h-4 w-4" disabled />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
