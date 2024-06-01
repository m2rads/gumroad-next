"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../google-auth-button";
import type { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "@/app/auth-server-action/actions";
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().nonempty('This is required').min(8, { message: 'Too short' }),
})

type UserFormValue = z.infer<typeof formSchema>;

export default function UserSignInForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: "",
    password: ""
  }

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
   console.log("loging in")
   const result = await signInWithEmailAndPassword(data);
    const {error} = JSON.parse(result)

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "Uh uh! Something went wrong.", 
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-zinc-700 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        )
      })
    }
    else {
      toast({
        description: "Log in was successfull."
      })
    }
    setLoading(false)
  };


  return (
    <>
      <GoogleSignInButton />
      <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="●●●●●●●"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Sign In With Email
          </Button>
        </form>
      </Form>      
      <Toaster />
    </>
  );
}
