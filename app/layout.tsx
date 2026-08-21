import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bundle — Operations control tower",
  description: "A visual OMS control-tower prototype for Wayfindr Bundle.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
