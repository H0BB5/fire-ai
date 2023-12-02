"use client";

import axios from "axios";
import * as z from "zod";
import { Customer, Tag } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UploadThing } from "@/components/image-upload";

const SEED_DETAILS =
  "Place some additional information about the business here.";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Company Name is required",
  }),
  description: z.string().min(1, {
    message: "Address is required",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed require at least 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

interface CompanionFormProps {
  initialData: Customer | null;
  tags: Tag[];
}

export const TagForm = ({ tags, initialData }: CompanionFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update Ticket
        await axios.patch(`/api/tag/${initialData.id}`, values);
      } else {
        // Create Schedule
        await axios.post("/api/tag", values);
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
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Confirm Extraction</h3>
              <p className="text-sm text-muted-foreground">
                Confirm the below details of the Tag
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <UploadThing />
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* COMPANY NAME  */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter address here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* LOCATION  */}
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem
                          key={tag.id}
                          value={tag.id}
                          className="hover:bg-primary/10"
                        >
                          {tag.rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>
                </FormItem>
              )}
            />
            {/* TYPE  */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="CEO & Founder of Tesla, SpaceX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SERIAL NUMBER  */}
            {/* RATING  */}
            {/* EXTINGUISHER | FIRE HOSE | FIRE SYSTEM  */}
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="font-medium">Additional Information</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Provide any additional information that may be relevant when
                contacting customer
              </p>
            </div>
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background"
                    disabled={isLoading}
                    rows={7}
                    placeholder={SEED_DETAILS}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your compan&apos;s backstory and relevant
                  details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-content">
            <Button size="lg" disabled={isLoading}>
              {initialData
                ? "Edit your companion"
                : "Schedule service reminder"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
