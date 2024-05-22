"use client";

import Image from "next/image";
import Link from "next/link";
import { topbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignedIn, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Topbar = () => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});


  
  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

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
              className={`topsidebar_link items-center hover:bg-active ${
                isActive && "bg-active"
              }`}
            >
              <Image src={link.icon} alt={link.label} width={24} height={24} />
              <p
                className={`text-subtext max-lg:hidden text-small-semibold ${
                  isActive && "text-black text-small-bold"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          {user? (
        <div className="flex items-center gap-2">
          <Image 
            src="/assets/coin.svg"
            width={30}
            height={30}
            alt="credit"
          />
          <p className="text-subtext text-small-semibold">{userData?.credit}</p>
        </div>
          ) : (
            null
          )}
          <UserButton />
          <div className="block">
            <SignedIn>
              <SignOutButton redirectUrl="/sign-in">
                <div className="flex cursor-pointer">
                <Logout sx={{ color: "subtext", fontSize: "32px" }} />
                </div>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      
    </div>
  );
};

export default Topbar;
