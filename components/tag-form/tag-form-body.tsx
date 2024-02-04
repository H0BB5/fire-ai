import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { EQUIPMENT, equipmentTypes } from "@/app/store/fire-ai";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export const TagFormBody = () => {
  const { control, formState, getValues, setValue } = useFormContext();
  const [tagType, setTagType] = useState<EQUIPMENT>();

  const isLoading = formState.isSubmitting;
  // get tagType from form

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
              <RadioGroup
                {...field}
                ref={field.ref}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("type", value);
                }}
              >
                {equipmentTypes.map((equipment, i) => (
                  <div
                    key={equipment.type}
                    className="flex items-center space-x-2 hover:cursor-pointer"
                  >
                    <RadioGroupItem
                      value={equipment.type}
                      id={`r${i}`}
                      className="hover:bg-primary/10 transition-colors ease-in-out transition-duration-200 "
                    />
                    <Label className="cursor-pointer" htmlFor={`r${i}`}>
                      {equipment.type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />
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
