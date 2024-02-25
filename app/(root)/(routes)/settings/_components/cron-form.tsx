import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { onSubmit } from "../actions";

export const CronForm = () => {
  return (
    <form action={onSubmit}>
      <Input name="email" placeholder="enter recipient email" required />

      <Button type="submit">Test</Button>
    </form>
  );
};
