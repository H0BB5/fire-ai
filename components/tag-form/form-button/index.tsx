import { ExtractedData, StageName } from "@/lib/store/types/state";
import { ActionButton } from "./button";
import { ArrowLeft, ArrowRight, Mail, Wand2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  useFrontTagStore,
  useMultiStepStore,
  useTagDataStore,
} from "@/lib/store/create-tag-slice";
import { CompanionFormProps, formSchema } from "../tag-form";
import { z } from "zod";

interface FormButtonProps {
  aiTagData: ExtractedData | null;
  stage: StageName;
  defaultValues: CompanionFormProps["defaultValues"];
  step: number;
  loading: boolean;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

export const FormButton = ({
  onSubmit,
  aiTagData,
  defaultValues,
  step: currentStep,
  stage: currentStage,
  loading: extractingText,
}: FormButtonProps) => {
  const form = useFormContext();
  const setStage = useMultiStepStore((state) => state.setStage);
  const incrementStep = useMultiStepStore((state) => state.increment);

  return (
    <>
      {/* Back Button, only shown if not on the first stage */}
      {currentStage !== StageName.FrontTag && (
        <ActionButton
          type="button"
          variant="link"
          onClick={() => {
            // Logic to determine previous stage
            const previousStage =
              currentStage === StageName.BackTag
                ? StageName.FrontTag
                : StageName.BackTag;
            setStage(previousStage);
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </ActionButton>
      )}
      {/* Continue Button, shown for certain stages */}
      {!aiTagData ||
        (currentStage !== StageName.Scheduling && !defaultValues && (
          <ActionButton
            type="button"
            onClick={() => {
              // Trigger form validation or stage advancement
              form
                .trigger([
                  "frontTagSrc",
                  "customer.address",
                  "businessName",
                  "type",
                ])
                .then((isValid) => {
                  if (isValid) {
                    const nextStage =
                      currentStage === StageName.FrontTag
                        ? StageName.BackTag
                        : StageName.Scheduling;
                    setStage(nextStage);
                    incrementStep();
                  }
                });
            }}
            disabled={currentStep <= 1}
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </ActionButton>
        ))}

      {/* Submit Button, conditionally rendered based on stage */}
      {(defaultValues || currentStage === StageName.Scheduling) && (
        <ActionButton
          type="submit"
          onClick={() => onSubmit}
          disabled={extractingText}
        >
          {defaultValues ? (
            <>
              Update Tag <Wand2 className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Schedule Reminder <Mail className="w-4 h-4 ml-2" />
            </>
          )}
        </ActionButton>
      )}
    </>
  );
};
