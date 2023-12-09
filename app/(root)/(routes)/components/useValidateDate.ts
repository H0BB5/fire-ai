import { useState } from "react";

interface UseDateValidationResult {
  date: Date | undefined;
  error: string;
  validateDate: (input: string) => void;
}

export default function useDateValidation(
  initialDate: Date
): UseDateValidationResult {
  const [date, setDate] = useState(initialDate);
  const [error, setError] = useState("");

  function validateDate(input: string) {
    const parsedDate = new Date(input);

    if (isNaN(parsedDate as any)) {
      setError("Invalid date");
    } else {
      setDate(parsedDate);
      setError("");
    }
  }

  return {
    date,
    error,
    validateDate,
  };
}
