"use client";
import React, { useState } from "react";
import { TagCards } from "@/components/tag-cards";
import { DeleteDialog } from "@/components/delete-dialog";
import axios from "axios";
import { Customer, Tag, Technician } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
// Import other necessary hooks and components

interface TagWrapperProps {
  initialTags: (Tag & {
    customer: Partial<Customer>;
    technician: Partial<Technician>;
  })[];
}

export const TagWrapper = ({ initialTags }: TagWrapperProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [tags, setTags] = useState(initialTags);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteClick = (tagId: string) => {
    setSelectedTagId(tagId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDeletion = async (tagId: string) => {
    try {
      const response = await axios.delete(`/api/tags/${tagId}`, {
        data: { tagId },
      });
      router.push("/");
      // Update the state to reflect the deletion
      const updatedTags = response.data;

      setTags(updatedTags);

      setIsDialogOpen(false);
      toast({
        description: "Tag successfully deleted!",
      });
      // Optionally, show a success message
    } catch (error) {
      console.error("Failed to delete tag", error);
      toast({
        description: "Failed to delete tag!",
      });
    }
  };

  return (
    <>
      <TagCards data={tags} onDelete={handleDeleteClick} />
      <DeleteDialog
        tagId={selectedTagId}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDeletion}
      />
    </>
  );
};
