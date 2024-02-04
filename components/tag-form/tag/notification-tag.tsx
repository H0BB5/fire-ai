import {
  setTagSendDate,
  useMultiStepStore,
  useTagDataStore,
} from "@/lib/store/create-tag-slice";
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
import { useFormContext, useWatch } from "react-hook-form";
import { DatePicker } from "@/components/date-picker";
import { startOfDay } from "date-fns";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect } from "react";

export const NotificationStep = () => {
  const { control, setValue, getValues, watch } = useFormContext();

  const notificationMethods = useWatch({
    control,
    name: "notificationMethods",
  });

  const sendDate = useWatch({
    control,
    name: "sendDate",
  });

  const handleChange = (value: string[]) => {
    setValue("notificationMethods", value);
  };
  const currentStage = useMultiStepStore((state) => state.stage);
  const dateValue = getValues("sendDate");

  const setSendDate = useTagDataStore((state) => state.setSendDate);

  useEffect(() => {
    setValue("notificationMethods", ["email"]);
  }, [setValue]);

  useEffect(() => {
    if (sendDate) {
      const utcMidnightDate = startOfDay(
        new Date(
          Date.UTC(
            sendDate.getFullYear(),
            sendDate.getMonth(),
            sendDate.getDate()
          )
        )
      );
      setSendDate(utcMidnightDate);
    }
  }, [sendDate, setSendDate, dateValue]);

  useEffect(() => {
    const formValues = watch();
  }, [watch]);

  return (
    <div className={cn("block", { block: currentStage === "Front Tag" })}>
      <div className="flex flex-col items-center justify-center space-y-4 ">
        <div className="text-lg mt-8 w-full mb-8">
          <Attention
            labels={["Schedule Notification"]}
            color="blue"
            animateRerendering={true}
            background={true}
          >
            <div className="flex flex-col items-center justify-center space-y-2 font-light">
              <p className="text-md font-semibold">Schedule Notification</p>
              <p className="text-sm text-center text-primary max-w-[80%]">
                A notification will be created and a reminder will be emailed to
                the team <span className="font-semibold">90 days</span> before
                the expiration&nbsp;date.
              </p>
            </div>
          </Attention>
        </div>
        {/* <div className="mt-4 flex flex-col justify-center items-center w-full space-y-4">
          <FormField
            name="notificationMethods"
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
                      value={notificationMethods}
                      onValueChange={handleChange}
                    >
                      <ToggleGroupItem
                        value="email"
                        aria-label="Toggle email"
                      >
                        <Mail className="h-4 w-4" />
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
        </div> */}
        <div className="flex w-full flex-col md:flex-row items-center justify-between">
          <div className="mb-4">
            <h2 className="text-md font-semibold mb-2">Expiration Date</h2>
            <p className="text-sm max-w-[21rem]">
              Adjust calendar to schedule notification to be sent as a reminder.{" "}
            </p>
          </div>
          <FormItem>
            <FormField
              name="sendDate"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm expiration date</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      name="sendDate"
                      value={sendDate}
                      onChange={(date) => field.onChange(date)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>
        </div>
      </div>
    </div>
  );
};
