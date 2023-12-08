"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { Tag, Notification, Technician } from "@prisma/client";
import { Button } from "./ui/button";
import { MessAvatar } from "./mess-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

interface NotificationHeaderProps {
  tag: Tag & {
    // companion
    notification: Notification[]; // messages
    _count: {
      notification: number;
    };
    technician: Partial<Technician>;
  };
}

export const NotificationHeader = ({ tag }: NotificationHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/tag/${tag.id}`);

      toast({
        description: "Success!",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        description: "Cannot delete tag.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <MessAvatar src={tag.photoFrontUrl || "empty.svg"} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{tag.name}</p>
            <div className="flex items-center text-sd text-muted-foreground">
              <MessagesSquare className="h-3 w-3 mr-1" />
              {tag._count.notification} {/* maybe show # of notifications */}
            </div>
            <p className="text-xs text-muted-foreground">
              Created by {tag.technician.email}
            </p>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="hover:select-none cursor-pointer"
            onClick={() => router.push(`/tag/${tag.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:select-none cursor-pointer"
            onClick={onDelete}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
