/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        radar: {
          bg: "#070A0F",
          card: "#0D121D",
          "card-elevated": "#121826",
          "card-hover": "#172033",
          border: "#172234",
          "border-subtle": "rgba(255, 255, 255, 0.07)",
          "border-glow": "rgba(0, 229, 255, 0.25)",
          cyan: "#00E5FF",
          "cyan-dim": "#00A8BD",
          "cyan-soft": "rgba(0, 229, 255, 0.12)",
          "cyan-subtle": "rgba(0, 229, 255, 0.05)",
          muted: "#7E8B9F",
          secondary: "#9EABC0",
          text: "#E2E8F0",
        },
        semantic: {
          safe: "#10B981",
          "safe-soft": "rgba(16, 185, 129, 0.15)",
          watch: "#EAB308",
          "watch-soft": "rgba(234, 179, 8, 0.15)",
          warning: "#F97316",
          "warning-soft": "rgba(249, 115, 22, 0.15)",
          critical: "#EF4444",
          "critical-soft": "rgba(239, 68, 68, 0.18)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'cyan-glow': '0 0 15px rgba(0, 229, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
