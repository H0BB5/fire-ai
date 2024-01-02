import { useMultiStepStore } from "@/lib/store/create-tag-slice";
import { Attention } from "@/components/attention";
import { UploadThing } from "@/components/image-upload";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "@/components/date-picker";
import { Mail, MessageCircle } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const NotificationStep = () => {
  const form = useFormContext();
  const { control, setValue, getValues, formState } = form;
  const handleChange = (value: string[]) => {
    setValue("notificationMethod", value);
  };
  const currentStage = useMultiStepStore((state) => state.stage);
  const dateValue = getValues("sendDate");

  return (
    <div className={cn("block", { block: currentStage === "Front Tag" })}>
      <FormField
        name="backTagSrc"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-center justify-center space-y-4 ">
            <FormLabel className="text-lg mt-8">
              <Attention
                labels={["Schedule Notification"]}
                color="blue"
                animateRerendering={true}
                background={true}
              >
                <div className="flex flex-col items-center justify-center space-y-2 font-light">
                  <p className="text-md font-semibold">Schedule Notification</p>
                  <p className="text-sm text-center text-primary">
                    Adjust calendar to schedule notification to be sent as a
                    reminder.
                  </p>
                </div>
              </Attention>
            </FormLabel>
            <div className="mt-4 flex flex-col justify-center items-center w-full space-y-4">
              <FormField
                name="notificationMethod"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex align-center items-center justify-between max-w-[280px] col-span-2 md:col-span-1">
                    <div className="flex justify-betweena align-center items-center">
                      <div className="mr-6">
                        <FormLabel>Notification method: </FormLabel>
                      </div>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          onValueChange={handleChange}
                        >
                          <ToggleGroupItem
                            value="email"
                            aria-label="Toggle email"
                          >
                            <Mail className="h-4 w-4" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="sms"
                            aria-label="Toggle text message"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </div>
            <div className="mx-auto">
              <DatePicker value={dateValue} />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
