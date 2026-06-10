import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
        },
        midnight: {
          50: "#f0f0ff",
          100: "#e0e0ff",
          800: "#1a1030",
          900: "#0f0a1e",
          950: "#080510",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        script: ["Dancing Script", "cursive"],
        accent: ["Cormorant Garamond", "serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        aurora: "aurora 15s ease-in-out infinite",
        "aurora-2": "aurora2 20s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-heart": "pulseHeart 1.5s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
        "blink-caret": "blinkCaret 0.75s step-end infinite",
        flip: "flip 0.6s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": {
            textShadow:
              "0 0 10px rgba(244,63,94,0.5), 0 0 20px rgba(244,63,94,0.3), 0 0 40px rgba(244,63,94,0.1)",
          },
          "100%": {
            textShadow:
              "0 0 20px rgba(244,63,94,0.8), 0 0 40px rgba(244,63,94,0.5), 0 0 80px rgba(244,63,94,0.3)",
          },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(244,63,94,0.3), 0 0 60px rgba(244,63,94,0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(244,63,94,0.5), 0 0 80px rgba(244,63,94,0.2)",
          },
        },
        aurora: {
          "0%, 100%": { transform: "translateX(-50%) translateY(-50%) rotate(0deg) scale(1.5)" },
          "33%": { transform: "translateX(-30%) translateY(-60%) rotate(120deg) scale(1.8)" },
          "66%": { transform: "translateX(-70%) translateY(-40%) rotate(240deg) scale(1.3)" },
        },
        aurora2: {
          "0%, 100%": { transform: "translateX(-30%) translateY(-60%) rotate(0deg) scale(1.3)" },
          "33%": { transform: "translateX(-60%) translateY(-30%) rotate(-120deg) scale(1.6)" },
          "66%": { transform: "translateX(-40%) translateY(-70%) rotate(-240deg) scale(1.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.15)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blinkCaret: {
          "50%": { borderColor: "transparent" },
        },
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
