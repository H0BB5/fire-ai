"use client";

import axios from "axios";
import * as z from "zod";
import { Customer, Tag, Notification } from "@prisma/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { TagFormSkeleton } from "./tag-form-skeleton";
import { TagFormBody } from "./tag-form-body";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Mail, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { FrontTagStep } from "./tag/front-tag";
import {
  useFormReset,
  useFrontTagStore,
  useMultiStepStore,
  useTagDataStore,
} from "@/lib/store/create-tag-slice";
import { StageName, StepStates } from "@/lib/store/types/state";
import { BackTagStep } from "./tag/back-tag";
import { NotificationStep } from "./tag/notification-tag";
import { FormButton } from "./form-button/index";

export interface CompanionFormProps {
  defaultValues:
    | (Tag & {
        customer?: Partial<Customer>;
        notification?: Partial<Notification>;
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
  backTagSrc: z.string().optional(),
  notificationMethods: z.array(z.string()).optional(),
  sendDate: z.date({
    required_error: "Make sure the expiration date is correct",
  }),
});

export const TagForm = ({ defaultValues }: CompanionFormProps) => {
  const totalSteps = 5;
  const currentStage = useMultiStepStore((state) => state.stage);
  console.log("currentStage", currentStage);
  const currentStep = useMultiStepStore((state) => state.currentStep);
  console.log("currentStep", currentStep);
  const incrementStep = useMultiStepStore((state) => state.increment);
  const setStage = useMultiStepStore((state) => state.setStage);
  const router = useRouter();
  const { toast } = useToast();
  const aiTagData = useTagDataStore((state) => state.data);
  console.log(defaultValues);
  const { address, technicianNotes } = defaultValues?.customer || {};
  const addressValue = address === null ? "" : address;
  const technicianNotesValue = technicianNotes === null ? "" : technicianNotes;
  const extractingText = useFrontTagStore((state) => state.extracting);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frontTagSrc: defaultValues?.frontTagSrc || "",
      businessName: defaultValues?.businessName || "",
      type: defaultValues?.type || "",
      customer: {
        address: defaultValues?.customer?.address || "",
        technicianNotes: defaultValues?.customer?.technicianNotes || "",
      },
      backTagSrc: defaultValues?.backTagSrc || "",
      notificationMethods: [],
      sendDate: defaultValues?.notification?.sendDate || undefined,
    },
  });
  const { setValue } = form;

  useEffect(() => {
    if (defaultValues) {
      setValue("frontTagSrc", defaultValues.frontTagSrc);
      setValue("businessName", defaultValues.businessName);
      setValue("type", defaultValues.type);
      setValue("customer.address", addressValue);
      setValue("sendDate", defaultValues?.expirationDate || new Date());
      setValue("customer.technicianNotes", technicianNotesValue);
    }
  }, [defaultValues, addressValue, technicianNotesValue, setValue]);

  useEffect(() => {
    if (aiTagData) {
      incrementStep();
      setValue("businessName", aiTagData.businessName);
      setValue("customer.address", aiTagData.address);
      setValue("type", aiTagData.type);
      //form.setValue('lastTestDate', aiTagData.lastTestDate);
    }
  }, [setValue, aiTagData, incrementStep]);

  const resetForm = useFormReset();
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
      // clear form state
      form.reset();
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
    form.reset({
      frontTagSrc: "",
      businessName: "",
      type: "",
      customer: {
        address: "",
        technicianNotes: "",
      },
      backTagSrc: "",
      notificationMethods: [],
      sendDate: new Date(),
    });
    resetForm();
    router.refresh();
    router.push("/");
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            {!defaultValues && (
              <Progress
                className="w-full max-w-full md:w-2/3 mx-auto mt-4"
                value={(currentStep / totalSteps) * 100}
              />
            )}
            {/* // Upload Step */}
            <FrontTagStep />
            {/* // Tag Confirmation Step */}
            <div
              className={cn("relative", {
                hidden: currentStage != "Front Tag",
              })}
            >
              {extractingText == true ? (
                <TagFormSkeleton />
              ) : (
                (aiTagData || defaultValues) && <TagFormBody />
              )}
            </div>
            {/* // Back Tag Confirmation Step */}
            <div
              className={cn("relative", {
                block: currentStage === "Back Tag",
              })}
            >
              <BackTagStep />
            </div>
            {/* // Schedule Reminder Step */}
            <div
              className={cn("hidden", {
                block: currentStage === "Scheduling",
              })}
            >
              <NotificationStep />
            </div>
            {/* // Submit Step */}
            <div
              className={cn(
                "w-full flex flex-row space-x-2 md:flex-row",
                { "justify-center": currentStage === StageName.FrontTag },
                {
                  "justify-around md:justify-center":
                    currentStage === StageName.BackTag,
                },
                {
                  "justify-between md:justify-center":
                    currentStage === StageName.Scheduling,
                }
              )}
            >
              <FormButton
                loading={extractingText}
                step={currentStep}
                stage={currentStage}
                aiTagData={aiTagData}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
              />
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};
