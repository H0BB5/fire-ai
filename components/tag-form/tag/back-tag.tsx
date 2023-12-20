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

export const BackTagStep = () => {
  const form = useFormContext();
  const currentStage = useMultiStepStore((state) => state.stage);
  const updateStep = useMultiStepStore((state) => state.updateStep);

  return (
    <div className={cn("hidden", { block: currentStage === "Back Tag" })}>
      <FormField
        name="backTagSrc"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-center justify-center space-y-4 ">
            <FormLabel className="text-lg mt-8">
              <Attention
                labels={["Back Tag"]}
                color="blue"
                animateRerendering={true}
                background={true}
              >
                <div className="flex flex-col items-center justify-center space-y-2 font-light">
                  <p className="text-md font-semibold">
                    Back Tag Image (optional)
                  </p>
                  <p className="text-sm text-center text-primary">
                    For best results: Make sure the tag is in the center of the
                    photo and that the text is legible.
                  </p>
                </div>
              </Attention>
            </FormLabel>
            <UploadThing
              tagType="backTagSrc"
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
