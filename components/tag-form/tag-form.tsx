"use client";

import axios from "axios";
import * as z from "zod";
import { Customer, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { UploadThing } from "@/components/image-upload";
import { DatePicker } from "@/components/date-picker";
import { useAIStore } from "@/app/store/fire-ai";
import { Suspense, useEffect, useState } from "react";
import { TagFormSkeleton } from "./tag-form-skeleton";
import { TagFormBody } from "./tag-form-body";

export interface CompanionFormProps {
  defaultValues:
    | (Tag & {
        customer?: Partial<Customer>;
      })
    | null;
}

export const formSchema = z.object({
  frontTagSrc: z.string().min(1, {
    message: "Front Image of Tag is required",
  }),
  businessName: z.string().min(1, {
    message: "Customer Name is required",
  }),
  customer: z
    .object({
      address: z.string().min(1, {
        message: "Address is required",
      }),
      technicianNotes: z.string().optional(),
    })
    .partial(),
  type: z.string().min(1, {
    message: "Equipment Type is required",
  }),
  location: z.string().min(1, {
    message: "Equipment Location is required",
  }),
  serial: z.string().min(1, {
    message: "Serial Number is required",
  }),
  rating: z.string().min(1, {
    message: "Rating is required",
  }),
});

export const TagForm = ({ defaultValues }: CompanionFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const aiTagData = useAIStore((state) => state.aiTagData);

  const [isUploading, setIsUploading] = useState(false);

  console.log(defaultValues);
  const { address, technicianNotes } = defaultValues?.customer || {};
  const addressValue = address === null ? "" : address;
  const technicianNotesValue = technicianNotes === null ? "" : technicianNotes;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      customer: {
        address: addressValue,
        technicianNotes: technicianNotesValue,
      },
    },
  });

  useEffect(() => {
    if (aiTagData) {
      console.log("AI RETREIVED TAG DATA", aiTagData);
      form.setValue("businessName", aiTagData.businessName);
      form.setValue("customer.address", aiTagData.address);
      form.setValue("type", aiTagData.type);
      form.setValue("location", aiTagData.location);
      form.setValue("serial", aiTagData.serial);
      form.setValue("rating", aiTagData.rating);
      //form.setValue('lastTestDate', aiTagData.lastTestDate);
    }
  }, [form, aiTagData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      if (defaultValues) {
        // Update Ticket
        await axios.patch(`/api/tags/${defaultValues.id}`, values);
      } else {
        // Create Schedule
        await axios.post("/api/tags", values);
      }
      toast({
        description: "Success.",
      });
    } catch (err) {
      console.error(err, "Something went wrong");
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }

    router.refresh();
    router.push("/");
  };
  console.log("UPLOADING? ", isUploading);
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <FormField
              name="frontTagSrc"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                  <FormLabel className="text-lg">Upload Photo of Tag</FormLabel>
                  <UploadThing
                    onUpload={(url) => {
                      setIsUploading(true);
                      field.onChange(url);
                    }}
                    onClientUploadComplete={() => {
                      setIsUploading(false);
                    }}
                    setIsUploading={() => setIsUploading(isUploading)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {isUploading ? (
              <TagFormSkeleton />
            ) : (
              (aiTagData || defaultValues) && (
                <TagFormBody
                  formValues={defaultValues}
                  handleSubmit={onSubmit}
                />
              )
            )}
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};
