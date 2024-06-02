'use server'
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import { User } from '@/types/user'

interface Session {
    user: User;
  }

export async function signUpWithEmail(data: { email: string; password: string }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const result = await supabase.auth.signUp({ email: data.email, password: data.password });
    const user = result?.data?.user;

    if (!user) {
        // Handle error if user creation failed
        return JSON.stringify({ error: result.error?.message || 'User creation failed' });
    }

    // Create a profile entry in the public.profiles table
    const profileResult = await supabase
        .from('profiles')
        .insert([{ id: user.id, balance: 0, number_of_links: 0, reset_hash: '', email: user.email }]);

    if (profileResult.error) {
        // Handle error if profile creation failed
        return JSON.stringify({ error: profileResult.error.message });
    }

    // Return the user and profile data
    return JSON.stringify({ user, profile: profileResult.data });
}


export async function signOut() {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)
    const result = await supabase.auth.signOut()

    return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
}) {
    const cookieStore = cookies()

    const supabse = createClient(cookieStore)
    const result = await supabse.auth.signInWithPassword({email:data.email,password:data.password})

    return JSON.stringify(result);

}

export async function signInWithGoogle() {
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)
    // const result = await supabase.auth.signInWithOAuth({provider:'google', options:{redirectTo: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/callback`}})
    const result = await supabase.auth.signInWithOAuth({provider:'google', options:{redirectTo: `http:localhost:3000/auth/callback`}})

    return JSON.stringify(result);
}

export async function getSession(): Promise<Session | null> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase.auth.getSession();
  
    if (data?.session) {
      const session = data.session as any as Session; // Cast to any first, then to the custom Session type
      return session;
    }
  
    return null;
}
  