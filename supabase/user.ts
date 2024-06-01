'use server'

import { createClient } from "./server";
import { cookies } from "next/headers";

export default async function readUser() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const {data: {user}} = await supabase.auth.getUser();
    user ? console.log('user', user.id) : console.log('no user')

    return user
}