import readUserSession from "@/supabase/user-session";
import { redirect } from "next/navigation";

export default async function Layout({children} : {children: React.ReactNode}) {
    
    const {data} = await readUserSession();
    if (!data.session) return redirect("/")

    return(
        <>  
            {children}
        </>
    )
}