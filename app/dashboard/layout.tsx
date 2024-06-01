import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import readUserSession from "@/lib/supabase/user-session";
import { redirect } from "next/navigation";

export default async function Layout({children} : {children: React.ReactNode}) {
    
    const {data} = await readUserSession();
    if (!data.session) return redirect("/auth/login")

    return(
        <>  
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    )
}