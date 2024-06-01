"use client";

import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { signInWithGoogle } from "@/app/auth-server-action/actions";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    const result = await signInWithGoogle()
    const { error } = JSON.parse(result)
    const { data: googleOAuthRedirect } = JSON.parse(result)

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "Uh uh! Something went wrong.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        )
      })
      setLoading(false)
      return
    }
    else if (googleOAuthRedirect) {
      router.push(googleOAuthRedirect.url)
    }
    else {
      toast({
        variant: "destructive",
        title: "Unknwon error occurred",
        description: "Please try again or contact support if the problem persists"
      })
    }
  }

  return (
    <>
      <Button
      className="w-full"
      disabled={loading}
      variant="outline"
      type="button"
      onClick={()=> console.log('clicked')}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Continue with Google
      </Button>
    </>
  );
}
