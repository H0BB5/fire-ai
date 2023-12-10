import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-[3rem]">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-background pt-10 w-32">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
