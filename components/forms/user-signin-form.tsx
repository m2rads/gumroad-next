'use client'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "@/app/auth-server-action/actions";
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import { useAuth } from '@/components/context/auth-context';

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().nonempty('This is required').min(8, { message: 'Too short' }),
})

type UserFormValue = z.infer<typeof formSchema>;

export default function UserSignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();

  const defaultValues = {
    email: "",
    password: ""
  }

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    console.log("loging in");
    const result = await signInWithEmailAndPassword(data);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "Uh uh! Something went wrong.",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-zinc-700 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        )
      });
    } else {
      toast({
        description: "Log in was successful."
      });
      await refreshUser();
      router.push('/links')
    }
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          id="large-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full p-6 rounded-lg shadow-lg"
          style={{ background: "#fff" }}
        >
          <div className="flex justify-between items-center">
            {form.formState.errors.email || form.formState.errors.password ? (
              <h3>
                Log in to Gumroad <small className="error">{"Please provide valid information"}</small>
              </h3>
            ) : (
              <h3>
                Log in to Gumroad <small>Did we tell you we love you?</small>
              </h3>
            )}
          </div>
          <div className="flex space-x-2 items-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Email Address"
                      className="input-class"
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
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="input-class"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="button-class" type="submit">
              Log in
            </Button>
          </div>
          <div className="rainbow bar mt-2"></div>
        </form>
      </Form>
      <p id="below-form-p" className="mt-2 text-center">
        <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a> We all do.
      </p>
      <Toaster />
    </>
  );
}
