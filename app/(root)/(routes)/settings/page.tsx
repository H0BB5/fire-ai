import { Button } from "@/components/ui/button";
import { SubmitButton } from "./_components/submit-button";

export default async function Settings() {
  async function testNotifications() {
    "use server";
  }
  return (
    <div className="h-full p-4 lg:px-8 lg:pt-6 space-y-2">
      <h1 className="flex items-center font-medium text-xl md:text-2xl">
        Settings
      </h1>
      <SubmitButton>Test</SubmitButton>
    </div>
  );
}
