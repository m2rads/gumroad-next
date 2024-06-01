import { Metadata } from "next";
import Link from "next/link";
import UserSignInForm from "@/components/forms/user-signin-form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login to your PTZone account.",
};

export default async function LogInPage() { 

  return (
    <>
      <UserSignInForm />
    </>
  );
}
