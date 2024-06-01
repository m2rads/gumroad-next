'use server'
import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

export async function signUpWithEmail(data: {
    email: string;
    password: string;  
}) {   
    const cookieStore = cookies()

    const supabase = createClient(cookieStore)
    const result = await supabase.auth.signUp({email:data.email,password:data.password})
    console.log('user', result?.data?.user)
    
    return JSON.stringify(result);
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