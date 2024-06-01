import { Metadata } from "next";
import Link from "next/link";
import UserSignInForm from "@/components/forms/user-signin-form";
import readUserSession from "@/lib/supabase/user-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login to your PTZone account.",
};

export default async function LogInPage() { 
  
  const {data} = await readUserSession();
  if (data.session) return redirect("/dashboard")

  return (
    <>
      <UserSignInForm />
      <p id="below-form-p"><a href="/forgot-password">Forgot your password?</a> We all do.</p>
    </>
  );
}
