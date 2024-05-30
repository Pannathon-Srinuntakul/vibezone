import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-green-1">
      <SignUp path="/sign-up" />
    </div>
  );
}
