import clsx from "clsx";
import React from "react";

const Label = ({
  children,
  animateRerendering,
  color,
}: {
  children: React.ReactNode;
  animateRerendering?: boolean;
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
}) => {
  return (
    <div
      className={clsx(
        "rounded-full px-1.5 shadow-[0_0_1px_3px_var(--shadow)]",
        {
          "bg-gray-800 text-gray-300": color === "default",
          "bg-h0bb5-pink text-white": color === "pink",
          "bg-h0bb5-blue400 text-white": color === "blue",
          "bg-h0bb5-cyan text-white": color === "cyan",
          "bg-h0bb5-violet text-violet-100": color === "violet",
          "bg-h0bb5-orange text-white": color === "orange",
          "dark:animate-[highlight_1s_ease-in-out_1]": animateRerendering,
        }
      )}
    >
      {children}
    </div>
  );
};
export const Attention = ({
  children,
  labels = ["children"],
  size = "default",
  color = "default",
  animateRerendering = true,
  background = false,
}: {
  children: React.ReactNode;
  labels?: string[];
  size?: "small" | "default";
  color?: "default" | "pink" | "blue" | "violet" | "cyan" | "orange";
  background?: boolean;
  animateRerendering?: boolean;
}) => {
  return (
    <div
      className={clsx("relative rounded-lg border border-dashed", {
        "p-3 lg:p-5": size === "small",
        "p-4 lg:p-9": size === "default",
        "border-gray-700": color === "default",
        "border-h0bb5-pink": color === "pink",
        "border-h0bb5-blue400": color === "blue",
        "border-h0bb5-cyan": color === "cyan",
        "border-h0bb5-violet": color === "violet",
        "border-h0bb5-orange": color === "orange",
        "dark:bg-h0bb5-blue400/20": background && color === "blue",
        "text-h0bb5-pink dark:animate-[rerender_1s_ease-in-out_1]":
          animateRerendering,
      })}
    >
      <div
        className={clsx(
          "absolute -top-2.5 flex gap-x-1 text-[9px] uppercase leading-4 tracking-widest",
          {
            "left-3 lg:left-5": size === "small",
            "left-4 lg:left-9": size === "default",
          }
        )}
      >
        {labels.map((label) => {
          return (
            <Label
              key={label}
              color={color}
              animateRerendering={animateRerendering}
            >
              {label}
            </Label>
          );
        })}
      </div>

      {children}
    </div>
  );
};
