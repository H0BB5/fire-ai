import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebaouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebaouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}
