'use client'
import { createSupabaseBrowserClient } from "@/supabase/client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const supabase = createSupabaseBrowserClient()
        const signOut = async () => {
            const session = await supabase.auth.signOut();
            console.log("session: ", session)
            router.push("/")
        }
        signOut()
    }, [])
   
    return (
        <>
            <p>If you did not get redirected to the home page, please refresh your browser</p>
        </>
    )
}
