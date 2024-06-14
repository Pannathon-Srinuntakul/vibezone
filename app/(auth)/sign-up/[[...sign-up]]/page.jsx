import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-full flex flex-col gap-5 justify-center items-center my-5">
      <SignUp path="/sign-up" />
      <Link
        href="/private-policy"
        className="text-subtle-medium text-gray-700 mb-4 underline"
        target="_blank"
      >
        Private policy
      </Link>
    </div>
  );
}
