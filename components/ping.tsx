import clsx from "clsx";

interface PingProps {
  status: string;
}

export function Ping({ status }: PingProps) {
  return (
    <span className={clsx("flex h-[11px] w-[11px]")}>
      <span
        className={clsx(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          {
            "bg-h0bb5-pending": status === "pending",
            "bg-h0bb5-scheduled": status === "scheduled",
            "bg-h0bb5-sent": status === "sent",
          }
        )}
      ></span>
      <span
        className={clsx("relative inline-flex h-[11px] w-[11px] rounded-full", {
          "bg-h0bb5-pending": status === "pending",
          "bg-h0bb5-scheduled": status === "scheduled",
          "bg-h0bb5-sent": status === "sent",
        })}
      ></span>
    </span>
  );
}
