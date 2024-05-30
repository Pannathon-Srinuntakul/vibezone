"use client";

import { topbarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {topbarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") return null;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-active"}`}
            >
              <Image src={link.icon} alt={link.label} width={24} height={24} />

              <p className="text-subtle-medium text-subtle max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
        <Link
          href={`/profile/${userId}`}
          key="Profile"
          className={`bottombar_link hover:bg-active`}
        >
          <Image src="/assets/user.svg" alt="Profile" width={24} height={24} />
          <p className="text-subtle-medium text-subtle max-sm:hidden">
            Profile
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Bottombar;
