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
import { useAIStore } from "@/app/store/fire-ai";
import { Suspense, useEffect, useState } from "react";
import { TagFormSkeleton } from "./tag-form-skeleton";
import { TagFormBody } from "./tag-form-body";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Attention } from "../attention";
import { set } from "date-fns";
import { FrontTagStep } from "./tag/front-tag";

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
  const totalSteps = 5;
  const [formStep, setFormStep] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const aiTagData = useAIStore((state) => state.aiTagData);
  console.log(defaultValues);
  const { address, technicianNotes } = defaultValues?.customer || {};
  const addressValue = address === null ? "" : address;
  const technicianNotesValue = technicianNotes === null ? "" : technicianNotes;
  const extractingText = useAIStore((state) => state.isExtracting);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frontTagSrc: "",
      businessName: "",
      type: "",
      location: "",
      serial: "",
      rating: "",
      customer: {
        address: "",
        technicianNotes: "",
      },
    },
  });
  const { setValue } = form;

  useEffect(() => {
    if (defaultValues) {
      setValue("frontTagSrc", defaultValues.frontTagSrc);
      setValue("businessName", defaultValues.businessName);
      setValue("type", defaultValues.type);
      setValue("location", defaultValues.location);
      setValue("serial", defaultValues.serial);
      setValue("rating", defaultValues.rating);
      setValue("customer.address", addressValue);
      setValue("customer.technicianNotes", technicianNotesValue);
    }
  }, [defaultValues, addressValue, technicianNotesValue, setValue]);

  useEffect(() => {
    if (aiTagData) {
      setFormStep(1);
      setValue("businessName", aiTagData.businessName);
      setValue("customer.address", aiTagData.address);
      setValue("type", aiTagData.type);
      setValue("location", aiTagData.location);
      setValue("serial", aiTagData.serial);
      setValue("rating", aiTagData.rating);
      //form.setValue('lastTestDate', aiTagData.lastTestDate);
    }
  }, [setValue, aiTagData]);

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
  console.log("isTextextracting", extractingText);
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <Progress
              className="w-full max-w-full md:w-2/3 mx-auto"
              value={(formStep / totalSteps) * 100}
            />
            {/* // Upload Step */}
            <FrontTagStep />

            {/* // Tag Confirmation Step */}
            <div className={cn("relative", { hidden: formStep >= 2 })}>
              {extractingText == true ? (
                <TagFormSkeleton />
              ) : (
                (aiTagData || defaultValues) && <TagFormBody />
              )}
            </div>
            {/* // Back Tag Confirmation Step */}

            {/* // Schedule Reminder Step */}
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={extractingText}
                className={cn("hidden", {
                  block: defaultValues,
                })}
              >
                {defaultValues ? "Update Tag" : "Schedule reminder"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="ghost"
                className={cn({ hidden: formStep <= 1 })}
                onClick={() => {
                  setFormStep(formStep - 1);
                }}
              >
                Go back <ArrowLeft className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                size="lg"
                className={cn({ hidden: formStep === 0 })}
                disabled={formStep === 0}
                onClick={() => {
                  // check if zod schema is valid
                  if (formStep === 1) {
                    form.trigger().then((isValid) => {
                      if (isValid) {
                        setFormStep(formStep + 1);
                      }
                    });
                  }
                }}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};
