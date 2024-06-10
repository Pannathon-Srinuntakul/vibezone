import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@components/layout/Topbar";
import Leftbar from "@components/layout/Leftbar";
import RightBar from "@components/layout/Rightbar";
import Bottombar from "@components/layout/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LifeBlance",
  description: "Welcome to our platform where you can share snapshots of your life's journey and the stories behind them. We're all about spreading positivity and building connections through shared experiences. Whether it's a special moment, a daily adventure, or a personal triumph, your story matters here. Join our vibrant community to inspire and be inspired, and let's make every day a celebration of life's beautiful moments together!",
  keywords: [
    "positivity",
    "inspiration",
    "motivation",
    "encouragement",
    "sharing experiences",
    "building connections",
    "community",
    "social",
    "share life's journey",
    "celebrating life",
    "meaningful moments",
    "special memories",
    "personal triumphs",
    "vibrant community",
    "colorful life",
    "daily adventures",
    "versatility",
    "daily moments",
    "life snapshots",
    "daily inspiration",
    "everyday celebrations",
    "photobooth",
    "polaroid",
    "frame"
  ]
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
