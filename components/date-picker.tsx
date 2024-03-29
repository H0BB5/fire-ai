"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm, useFormContext } from "react-hook-form";

interface Props {
  initialDate?: Date;
  value?: Date;
  name: string;
  onChange: (date: Date) => void;
}

export function DatePicker({ initialDate, value, onChange, name }: Props) {
  const { setValue } = useFormContext();

  const [date, setDate] = useState<Date>(
    initialDate ? initialDate : new Date()
  );

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const handleDate = (date: Date) => {
    setDate(date);
    const newStringDate = format(date, "PPP");
    setStringDate(newStringDate);
    setValue("sendDate", newStringDate);
    if (onChange) {
      onChange(date);
    }
  };
  if (!date) {
    let date = new Date();
    setDate(date);
  }
  const [stringDate, setStringDate] = useState(
    initialDate && isValid(initialDate)
      ? format(initialDate, "PPP")
      : format(new Date(), "PPP")
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <Popover>
      <div className="relative w-[280px]">
        <Input
          name={name}
          type="string"
          value={stringDate}
          onFocus={() => {
            if (date) setStringDate(format(date, "MM/dd/yyyy"));
          }}
          onChange={(e) => {
            setStringDate(e.target.value);
          }}
          onBlur={(e) => {
            const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());
            if (isValid(parsedDate)) {
              handleDate(parsedDate);
              setErrorMessage("");
            } else {
              setErrorMessage("Invalid Date");
            }
          }}
        />
        {errorMessage !== "" && (
          <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          defaultMonth={date}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;
            handleDate(selectedDate);
            setErrorMessage("");
          }}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
