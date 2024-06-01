'use client'
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from "@/app/auth-server-action/actions";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().nonempty('This is required').min(8, { message: 'Too short' }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserSignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const defaultValues = {
    email: "",
    password: ""
  }

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setEmail(data.email);
    setPassword(data.password);
    setLoading(false);

    const result = await signUpWithEmail(data);
    const { error } = JSON.parse(result)

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
    else {
      toast({
        description: "Registered Successfully",
      })
      router.push('/auth/signup/confirm')
    }
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
            <h3>
              Sign up for Gumroad 
              <small className="text-gray-600 ml-2">Fill in the simple form below and start selling in minutes</small>
            </h3>
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
              Start selling!
            </Button>
          </div>
          <div className="rainbow bar mt-2"></div>
        </form>
      </Form>     
      <Toaster />
    </>
  );
}
