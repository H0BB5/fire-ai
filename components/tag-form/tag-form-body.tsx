import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Wand2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "../date-picker";
import { TagFormSkeleton } from "./tag-form-skeleton";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm, useFormContext } from "react-hook-form";
import { CompanionFormProps } from "./tag-form";
import { Customer, Tag } from "@prisma/client";
import { useAIStore } from "@/app/store/fire-ai";

type TagExtraction = {
  nameOfTagIssuer: string;
  businessName: string;
  address: string;
  type: EQUIPMENT;
  location: string;
  serial: string;
  rating: string;
  lastTestDate: Date | undefined;
};

enum EQUIPMENT {
  Extinguisher = "Fire Extinguisher",
  Hose = "Fire Hose",
  System = "System",
}

const equipmentTypes = [
  {
    type: "Fire Extinguisher",
  },
  {
    type: "Fire Hose",
  },
  {
    type: "System",
  },
];

export const TagFormBody = () => {
  const { control, formState } = useFormContext();
  const isLoading = formState.isSubmitting;
  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-2 w-full">
        <div>
          <h3 className="text-lg font-medium">Confirm Extraction</h3>
          <p className="text-sm text-muted-foreground">
            Confirm the below details of the Tag
          </p>
        </div>
        <Separator className="bg-primary/10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* COMPANY NAME  */}
        <FormField
          name="businessName"
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter name of company"
                  {...field}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Business Address  */}
        <FormField
          name="customer.address"
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Customer Address</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter address"
                  {...field}
                  ref={field.ref}
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
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Equipment Type</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl ref={field.ref}>
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
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Equipment Location</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Location of tag"
                  {...field}
                  ref={field.ref}
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
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter Serial Number"
                  {...field}
                  ref={field.ref}
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
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Enter Rating"
                  {...field}
                  ref={field.ref}
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
          name="customer.technicianNotes"
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>
                <h3 className="font-medium">Technician Notes</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Contact information, customer preferences, job notes, etc.,
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
                  ref={field.ref}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

TagFormBody.displayName = "TagFormBody";
