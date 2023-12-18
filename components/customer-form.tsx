"use client";

import axios from "axios";
import * as z from "zod";
import { Customer, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UploadThing } from "@/components/image-upload";

import { useAIStore } from "@/app/store/fire-ai";

const formSchema = z.object({
  businessName: z.string().min(1, {
    message: "Customer Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
  technicianNotes: z.string().optional(),
});

interface CustomerFormProps {
  initialData: Partial<Customer> | null;
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

export const CustomerForm = ({ tags, initialData }: CustomerFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: initialData?.businessName || "",
      address: initialData?.address || "",
      contactName: initialData?.contactName || "",
      contactEmail: initialData?.contactEmail || "",
      technicianNotes: initialData?.technicianNotes || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response;
      if (initialData) {
        // Update Ticket
        response = await axios.patch(`/api/customer/${initialData.id}`, values);
      } else {
        // Create Schedule
        response = await axios.post("/api/customer", values);
      }
      toast({
        description: "Success.",
      });
      router.refresh();
      router.push(`/customer/${response.data.id}`);
    } catch (err) {
      console.error(err, "Something went wrong");
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }
  };
  console.log("customer form", initialData);
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* COMPANY NAME  */}
            <FormField
              name="businessName"
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
            {/* Contact Name  */}
            <FormField
              name="contactName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Customer Contact</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Name of contact person"
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
                  <FormLabel>Address</FormLabel>
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
            {/* Contact Email  */}
            <FormField
              name="contactEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter contact email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <FormField
              name="technicianNotes"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>
                    <h3 className="font-medium">Technician Notes</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Business information, point of contact, job notes, etc.,
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background"
                      disabled={isLoading}
                      rows={7}
                      placeholder="Provide any additional information that may be relevant
                      for this customer account."
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
              <Building2 className="w-4 h-4 mr-2" />
              {initialData ? "Update customer info" : "Create customer record"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
