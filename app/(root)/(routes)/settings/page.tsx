import { CronForm } from "./_components/cron-form";

export default async function Settings() {
  return (
    <div className="h-full p-4 lg:px-8 lg:pt-6 space-y-2">
      <h1 className="flex items-center font-medium text-xl md:text-2xl">
        Settings
      </h1>
      <CronForm />
    </div>
  );
}
