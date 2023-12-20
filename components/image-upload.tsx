"use client";

import { UploadButton } from "@/lib/uploadthing";
import { Upload, Camera } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  setExtraction,
  setExtractingText,
  useAIStore,
} from "@/app/store/fire-ai";
import { useFormContext } from "react-hook-form";
import { extractText } from "./tag-form/actions/extract-text";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UploadThingProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload: (url: string) => void;
}

const transformResponse = (response: any) => {
  return {
    nameOfTagIssuer: response.nameOfTagIssuer,
    businessName: response.customerName,
    address: response.address,
    type: response.type,
    location: response.location,
    serial: response.serial,
    rating: response.rating,
    lastTestDate: response.lastTestDate, // handle date conversion
  };
};

export const UploadThing = ({ onUpload, ...props }: UploadThingProps) => {
  const { setValue, getValues } = useFormContext();
  const { control, formState } = useFormContext();
  const initialImage = getValues("frontTagSrc");
  const [photo, setPhoto] = useState(initialImage);

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div
        className="
        p-4
        border-2
        border-dashed
        border-primary/10
        bg-card
        rounded-lg
        hover:opacity-75
        hover:cursor-pointer
        transition
        flex
        flex-col
        space-y-2
        items-center
        justify-center"
      >
        {/* {initialImage && ( */}
        <div
          className={cn(
            initialImage
              ? "relative h-40 w-40 flex flex-col items-center justify-center"
              : "hidden"
          )}
        >
          <div className={cn(`max-w-full mx-auto rounded-lg object-contain`)}>
            <AlertDialog>
              <AlertDialogTrigger>
                <Image
                  fill
                  alt="Upload"
                  sizes={"min-width: 100%"}
                  src={initialImage ? initialImage : "/empty.png"}
                  className="object-contain"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Image
                  alt="Upload"
                  width={400}
                  height={400}
                  src={initialImage ? initialImage : "/empty.png"}
                  className={cn(
                    initialImage
                      ? `max-w-full mx-auto rounded-lg object-contain`
                      : `hidden`
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setPhoto(null);
                      setValue("frontTagSrc", null);
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {/* )} */}
        {!initialImage && (
          <div
            className={`relative h-40 w-40 flex flex-col items-center justify-center`}
          >
            <div className="flex w-1/2 justify-around mb-2">
              <Camera className="h-5 w-5" />
              /
              <Upload className="h-5 w-5" />
            </div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setPhoto(res[0].url);
                extractText(res[0].url);
                setValue("frontTagSrc", res[0].url);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
