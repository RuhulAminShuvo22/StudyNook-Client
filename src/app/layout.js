import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StudyNook",
    template: "StudyNook – %s",
  },
  description:
    "Browse and book quiet, private study rooms in your library.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* React Hot Toast */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0f172a",
                color: "#ffffff",
                borderRadius: "14px",
                padding: "14px 18px",
                fontSize: "14px",
                fontWeight: "600",
              },
              success: {
                iconTheme: {
                  primary: "#06b6d4",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}