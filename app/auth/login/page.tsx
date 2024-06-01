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
      <div className="flex flex-col space-y-2 mb-3 ">
        <h1 className="text-3xl font-semibold tracking-tight">
        Welcome Back.
        </h1>
        <p className="text-sm text-muted-foreground">
        Login to continue.
        </p>
      </div>
      <UserSignInForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "} 
        <Link
          href="/auth/signup"
          className="underline underline-offset-4 hover:text-primary"
          as="/auth/signup"
        >
          Sign up Now!
        </Link>
      </p>
      <p className="px-6 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
}
