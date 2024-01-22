"use client";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {children}
    </Button>
  );
}
