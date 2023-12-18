"use client";

import { cn } from "@/lib/utils";
import { Home, Tags, Settings, Building2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Dashboard",
    },
    {
      icon: Tags,
      href: "/tag/new",
      label: "Create",
    },
    {
      icon: Building2,
      href: "/customer",
      label: "Customers",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ];

  const onNavigate = (url: string) => {
    return router.push(url);
  };
  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-background">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href)}
              key={route.href}
              className={cn(
                "select-none text-muted-foreground text-xs group flex p-2 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
