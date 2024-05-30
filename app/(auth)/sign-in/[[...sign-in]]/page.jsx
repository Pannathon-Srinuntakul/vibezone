import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-green-1">
      <SignIn path="/sign-in" />
    </div>
  );
}
