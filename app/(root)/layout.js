import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@components/layout/Topbar";
import Leftbar from "@components/layout/Leftbar";
import RightBar from "@components/layout/Rightbar";
import Bottombar from "@components/layout/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Framefeeling",
  description: "Framefeeling allows you to post images and add descriptions that capture the essence of each moment, inspiring others to embrace life.",
  keywords: ["Framefeeling", "photography", "emotions", "inspiration", "beautiful frames", "polaroid style frames"],
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-green-1`}>
          <Topbar />
          <main className="flex flex-row">
            <Leftbar className="max-lg:hidden" />
            <section className="main-container">{children}</section>
            <RightBar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
