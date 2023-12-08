"use client";

import { NotificationHeader } from "@/components/notification-header";
import { Tag, Notification, Technician } from "@prisma/client";

interface NotificationClientProps {
  tag: Tag & {
    // companion
    notification: Notification[]; // messages
    _count: {
      notification: number;
    };
    technician: Partial<Technician>;
  };
}

export const NotificationClient = ({ tag }: NotificationClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <NotificationHeader tag={tag} />
    </div>
  );
};
