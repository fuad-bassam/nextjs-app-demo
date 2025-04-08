import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "./_private/components/Header";
import { AuthProvider } from "./_private/Context/AuthContext";
import { DialogProvider } from "./_private/Context/DialogContext";
import { SnackbarProvider } from "./_private/Context/SnackbarContext";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <Script
          src="//unpkg.com/react-scan/dist/auto.global.js"
          strategy="afterInteractive" // or 'lazyOnload' depending on needs
          crossOrigin="anonymous"
        />
      </head>
      <body>

        <AuthProvider>
          <Header />

          <DialogProvider>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </DialogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
