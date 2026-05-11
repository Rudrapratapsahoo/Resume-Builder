import { VT323, Fira_Code } from "next/font/google";

import "./globals.css";

import AuthProvider
from "@/context/AuthContext";

const vt323 = VT323({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: ["400"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quantum Resume Terminal",
  description:
    "A futuristic quantum terminal inspired AI resume builder",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${vt323.variable} ${firaCode.variable} dark`}
    >
      <body
        className="
          relative
          min-h-screen
          overflow-x-hidden
          bg-[#0d0d0d]
          font-mono
          text-[#d7ffd0]
          antialiased
        "
      >

        <AuthProvider>

          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>

        </AuthProvider>

      </body>
    </html>
  );
}
