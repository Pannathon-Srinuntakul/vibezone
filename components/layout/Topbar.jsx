"use client";

import Image from "next/image";
import Link from "next/link";
import { topbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";

const Topbar = () => {
  const pathname = usePathname();

  return (
    <div className="topbar">
      {/* Image */}
      <div>
        <Link href="/">
          <Image src="/assets/ad.jpg" alt="logo" width={48} height={48} />
        </Link>
      </div>
      <div className="flex gap-6 text-small-semibold max-md:hidden">
        {topbarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`topsidebar_link items-center ${
                isActive && "bg-active"
              }`}
            >
              <Image src={link.icon} alt={link.label} width={24} height={24} />
              <p
                className={`text-subtext max-lg:hidden ${
                  isActive && "text-black"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <div className="block">
            <SignedIn>
              <SignOutButton redirectUrl="/sign-in">
                <div className="flex cursor-pointer">
                <Logout sx={{ color: "subtext", fontSize: "32px" }} />
                </div>
              </SignOutButton>
            </SignedIn>
          </div>
          <UserButton />
        </div>
      
    </div>
  );
};

export default Topbar;
