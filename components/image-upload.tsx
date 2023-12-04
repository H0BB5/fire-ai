"use client";

import { UploadButton } from "@/utils/uploadthing";
import { Upload, Camera } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { setExtraction } from "@/app/store/fire-ai";

export const UploadThing = () => {
  const [photo, setPhoto] = useState("");

  const extractText = async (imageUrl: string) => {
    const ocrResponse = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: imageUrl }),
    });
    const { response } = await ocrResponse.json();
    console.log("OCR Response Body:", response); // Log the raw response body
    setExtraction(response.message.content);
  };

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div
        className="
        p-4
        border-4
        border-dashed
        border-primary/10
        rounded-lg
        hover:opacity-75
        transition
        flex
        flex-col
        space-y-2
        items-center
        justify-center"
      >
        <div className="relative h-40 w-40 flex flex-col items-center justify-center">
          <div className={cn(photo ? `hidden` : `flex flex-col items-center`)}>
            <div className="flex w-1/2 justify-around mb-2">
              <Camera className="h-5 w-5" />
              /
              <Upload className="h-5 w-5" />
            </div>
            <UploadButton
              // content={{
              //   // button({ ready, isUploading }) {
              //   //   if (ready) return "Front Tag";
              //   //   if (isUploading) return "Scanning...";
              //   //   return "Loading...";
              //   // },
              // }}
              // change text
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setPhoto(res[0].url);
                extractText(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <Image
            fill
            alt="Upload"
            src={photo ? photo : "/images/placeholder.png"}
            className={cn(photo ? `rounded-lg object-cover` : `hidden`)}
          />
        </div>
      </div>
    </div>
  );
};
