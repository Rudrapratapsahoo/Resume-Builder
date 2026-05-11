import "./globals.css";
import AuthProvider from "@/context/AuthContext";

export const metadata = {
  title: "Quantum Resume Terminal",
  description: "A futuristic quantum terminal inspired AI resume builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="relative min-h-screen overflow-x-hidden bg-black text-white antialiased"
        style={{ fontFamily: "'Calibri', 'Segoe UI', Arial, sans-serif" }}
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
