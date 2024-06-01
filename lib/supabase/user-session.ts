'use server'

import { createClient } from "./server";
import { cookies } from "next/headers";

export default async function readUserSession() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    return supabase.auth.getSession();
}