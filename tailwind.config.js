/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";

module.exports = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        vercel: {
          pink: "#FF0080",
          blue: "#0070F3",
          cyan: "#50E3C2",
          orange: "#F5A623",
          violet: "#7928CA",
        },
        h0bb5: {
          /* Blue: */
          blue100: "hsla(215.45, 100%, 91.37%, 1)",
          blue200: "hsla(212.2, 100%, 59.8%, 1)",
          blue300: "hsla(212.35, 100%, 47.65%, 1)",
          blue400: "hsla(213.27, 93.52%, 42.35%, 1)",

          /* Error: */
          errorLighter: "hsla(349.69, 53.38%, 92.55%, 1)",
          errorLight: "hsla(0, 100%, 98.82%, 1)",
          error: "hsla(0, 100%, 50%, 1)",
          errorDark: "hsla(0, 100%, 89.02%, 1)",

          /* Success: */
          successLighter: "hsla(195, 100%, 97.25%, 1)",
          successLight: "hsla(201.54, 100%, 71.78%, 1)",
          success: "hsla(208, 100%, 60.78%, 1)",
          successDark: "hsla(204.94, 100%, 46.31%, 1)",

          /* Warning: */
          warningLighter: "hsla(56.52, 100%, 98.04%, 1)",
          warningLight: "hsla(45, 100%, 78.04%, 1)",
          warning: "hsla(41.09, 100%, 66.27%, 1)",
          warningDark: "hsla(35.4, 100%, 40.78%, 1)",

          /* Violet: */
          violetLighter: "hsla(296.46, 86.81%, 89.02%, 1)",
          violetLight: "hsla(266.28, 100%, 54.12%, 1)",
          violet: "hsla(264.42, 100%, 48%, 1)",
          violetDark: "hsla(263.46, 100%, 32.94%, 1)",

          /* Cyan: */
          cyanLighter: "hsla(170.61, 100%, 98.04%, 1)",
          cyanLight: "hsla(180, 100%, 79.22%, 1)",
          cyan: "hsla(183.3, 100%, 52.94%, 1)",
          cyanDark: "hsla(184.2, 100%, 34.51%, 1)",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      keyframes: ({ theme }) => ({
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.vercel.cyan"),
          },
          "40%": {
            ["border-color"]: theme("colors.vercel.cyan"),
          },
        },
        highlight: {
          "0%": {
            background: theme("colors.vercel.cyan"),
            color: theme("colors.white"),
          },
          "40%": {
            background: theme("colors.vercel.cyan"),
            color: theme("colors.white"),
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        translateXReset: {
          "100%": {
            transform: "translateX(0)",
          },
        },
        fadeToTransparent: {
          "0%": {
            opacity: "1",
          },
          "40%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      }),
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
