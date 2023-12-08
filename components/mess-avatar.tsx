import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

interface MessAvatarProps {
  src: string;
}

export const MessAvatar = ({ src }: MessAvatarProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src || "empty.svg"} />
    </Avatar>
  );
};
