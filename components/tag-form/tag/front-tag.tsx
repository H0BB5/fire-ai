import { useMultiStepStore } from "@/lib/store/create-tag-slice";
import { Attention } from "@/components/attention";
import { UploadThing } from "@/components/image-upload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export const FrontTagStep = () => {
  const form = useFormContext();
  const currentStage = useMultiStepStore((state) => state.stage);

  return (
    <div className={cn("block", { hidden: currentStage !== "Front Tag" })}>
      <FormField
        name="frontTagSrc"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-center justify-center space-y-4 ">
            <FormLabel className="text-lg mt-4 md:mt-6 w-full">
              <Attention
                labels={["Front Tag"]}
                color="blue"
                animateRerendering={true}
                background={true}
              >
                <div className="flex flex-col items-center justify-center space-y-2 font-light">
                  <p className="text-md font-semibold">Front Tag Image</p>
                  <p className="text-sm text-center text-primary">
                    For best results: Make sure the tag is in the center of the
                    photo and that the text is legible.
                  </p>
                </div>
              </Attention>
            </FormLabel>
            <UploadThing
              tagType="frontTagSrc"
              onUpload={async (url) => {
                field.onChange(url);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
