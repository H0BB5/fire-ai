"use client";

import axios from "axios";
import * as z from "zod";
import { Customer, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";
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
import { DatePicker } from "@/components/date-picker";
import { useAIStore } from "@/app/store/fire-ai";

const formSchema = z.object({
  frontTagSrc: z.string().min(1, {
    message: "Front Image of Tag is required",
  }),
  customer: z.string().min(1, {
    message: "Customer Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
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
  notes: z.string().optional(),
});

interface CompanionFormProps {
  initialData: Customer | Tag | null;
  tags: Tag[];
}

enum EQUIPMENT {
  Extinguisher = "Fire Extinguisher",
  Hose = "Fire Hose",
  System = "Fire System",
}

const equipmentTypes = [
  {
    type: EQUIPMENT.Extinguisher,
  },
  {
    type: EQUIPMENT.Hose,
  },
  {
    type: EQUIPMENT.System,
  },
];

export const TagForm = ({ tags, initialData }: CompanionFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const extractedText = useAIStore((state) => state.extraction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      frontTagSrc: "",
      // backTagSrc: "",
      customer: "",
      address: "",
      type: "",
      location: "",
      serial: "",
      rating: "",
      // expiration: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      if (initialData) {
        // Update Ticket
        await axios.patch(`/api/tags/${initialData.id}`, values);
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
                  <FormLabel>Upload Photo of Tag</FormLabel>
                  <UploadThing onUpload={(url) => field.onChange(url)} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-medium">Confirm Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Confirm the below details of the Tag
                </p>
              </div>
              <Separator className="bg-primary/10" />
              {extractedText}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* COMPANY NAME  */}
              <FormField
                name="customer"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter name of company"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Business Address  */}
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Customer Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TYPE  */}
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Equipment Type</FormLabel>
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
                            placeholder="Select type"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {equipmentTypes.map((equipment) => (
                          <SelectItem
                            key={equipment.type}
                            value={equipment.type}
                            className="hover:bg-primary/10"
                          >
                            {equipment.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* <FormDescription>
                    Select the type of equipment the tag is for
                  </FormDescription> */}
                  </FormItem>
                )}
              />
              {/* LOCATION  */}
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Equipment Location</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Location of tag"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SERIAL NUMBER  */}
              <FormField
                name="serial"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Serial Number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* RATING  */}
              <FormField
                name="rating"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Rating"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DatePicker />
            </div>
            {/* TECHNICIAN NOTES */}
            <div className="space-y-2 w-full">
              <FormField
                name="notes"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>
                      <h3 className="font-medium">Technician Notes</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Contact information, customer preferences, job notes,
                        etc.,
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-background"
                        disabled={isLoading}
                        rows={7}
                        placeholder="Provide any additional information that may be relevant
                      when contacting customer"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-content">
              <Button size="lg" disabled={isLoading}>
                {initialData
                  ? "Update tag submission"
                  : "Schedule service reminder"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};
