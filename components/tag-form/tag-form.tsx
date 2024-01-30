"use client";

import axios from "axios";
import * as z from "zod";
import { Customer, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { TagFormSkeleton } from "./tag-form-skeleton";
import { TagFormBody } from "./tag-form-body";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { FrontTagStep } from "./tag/front-tag";
import {
  useFrontTagStore,
  useMultiStepStore,
  useTagDataStore,
} from "@/lib/store/create-tag-slice";
import { StepStates } from "@/lib/store/types/state";
import { BackTagStep } from "./tag/back-tag";
import { NotificationStep } from "./tag/notification-tag";

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
  location: z.string().min(1, {
    message: "Equipment Location is required",
  }),
  serial: z.string().min(1, {
    message: "Serial Number is required",
  }),
  rating: z.string().min(1, {
    message: "Rating is required",
  }),
  backTagSrc: z.string().optional(),
  notificationMethods: z.array(z.string()).optional(),
  sendDate: z.date().optional(),
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
      backTagSrc: "",
      notificationMethods: [],
      sendDate: new Date(),
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
      incrementStep();
      setValue("businessName", aiTagData.businessName);
      setValue("customer.address", aiTagData.address);
      setValue("type", aiTagData.type);
      setValue("location", aiTagData.location);
      setValue("serial", aiTagData.serial);
      setValue("rating", aiTagData.rating);
      //form.setValue('lastTestDate', aiTagData.lastTestDate);
    }
  }, [setValue, aiTagData, incrementStep]);

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
            <div className="w-full flex justify-center">
              {/* Back Button */}
              <Button
                type="button"
                size="lg"
                variant="ghost"
                className={cn({ hidden: currentStage === "Front Tag" })}
                onClick={() => {
                  if (currentStage === "Back Tag") {
                    setStage("Front Tag" as StepStates["stage"]);
                  } else {
                    setStage("Back Tag" as StepStates["stage"]);
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go back
              </Button>
              {/* Next Button */}
              <Button
                type="button"
                size="lg"
                className={cn({
                  hidden: currentStep === 0 || currentStage === "Scheduling",
                })}
                disabled={currentStep <= 1}
                onClick={() => {
                  if (currentStage === "Front Tag") {
                    form.trigger().then((isValid) => {
                      // check if zod schema is valid
                      if (isValid) {
                        if (currentStage === "Front Tag") {
                          setStage("Back Tag" as StepStates["stage"]);
                        } else {
                          setStage("Scheduling" as StepStates["stage"]);
                        }
                        incrementStep();
                      }
                    });
                  }
                  if (currentStage === "Back Tag") {
                    setStage("Scheduling" as StepStates["stage"]);
                    incrementStep();
                  }
                }}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={extractingText}
                className={cn("hidden", {
                  flex: defaultValues || currentStage === "Scheduling",
                })}
              >
                {defaultValues ? "Update Tag" : "Schedule reminder"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};
