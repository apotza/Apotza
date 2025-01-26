import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../_app";
import ReactQueryProvider from "../providers/react_query,";
import Protected_Route from "../_protected";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Apotza",
  description: "Apotza Internal Tooling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // redirect("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="icon" href="apotzalogo.jpg" />
      </head>
      <body suppressHydrationWarning>
        <ReactQueryProvider>
          {/* <Protected_Route> */}
          {children}
          {/* </Protected_Route> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
