"use client";

import { cn } from "@/lib/utils";
import { Tag } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

interface TagProps {
  data: Tag[];
}

export const Tags = ({ data }: TagProps) => {
  const router = useRouter();
  const searchparams = useSearchParams();

  const tagId = searchparams?.get("tagId");

  const onClick = (id: string | undefined) => {
    if (id) {
      const url =
        window.location.origin + window.location.pathname + "/tag/" + id;
      router.push(url);
    }
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          `
            flex 
            items-center
            text-center
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-4
            md:py-3
            rounded-md
            hover:opacity-75
            transition
            border
          `,
          !tagId ? "bg-card" : "bg-card"
        )}
      >
        Newest
      </button>
      {data.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onClick(tag.id)}
          className={cn(
            `
            flex 
            items-center
            text-center
            text-xs
            md:text-sm
            px-2
            md:px-4
            py-4
            md:py-3
            rounded-md
            bg-primary
            hover:opacity-75
            transition
            border
          `,
            tag.id === tagId ? "bg-card" : "bg-card"
          )}
        >
          {tag.businessName}
        </button>
      ))}
    </div>
  );
};
