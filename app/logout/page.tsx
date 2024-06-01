'use server'
import { signOut } from "../auth-server-action/actions"

export default async function Page() {
    const result = await signOut()
    const { error } = JSON.parse(result)
    console.log("error signing out: ", error)
    
    return (
        <>
            <p>Sere you again soon!</p>
        </>
    )
}