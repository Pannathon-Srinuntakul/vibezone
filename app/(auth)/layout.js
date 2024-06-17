import { Inter } from "next/font/google";
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Framefeeling",
  description: "Framefeeling allows you to post images and add descriptions that capture the essence of each moment, inspiring others to embrace life.",
  keywords: ["Framefeeling", "photography", "emotions", "inspiration", "beautiful frames", "polaroid style frames"],
};


export default function RootLayout({
  children}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} bg-green-1`}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
