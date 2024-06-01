import Link from "next/link"

export default async function Layout({children} : {children: React.ReactNode}) {

    return(
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-dumbbell mr-2">
                    <path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>
                </svg>
                <p>PTZone</p>
                </div>
                {/* <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-lg">
                    &ldquo;This library has saved me countless hours of work and
                    helped me deliver stunning designs to my clients faster than ever
                    before.&rdquo;
                    </p>
                    <footer className="text-sm">Sofia Davis</footer>
                </blockquote>
                </div> */}
            </div>
            <div className="p-4 lg:p-8 h-full flex items-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                {children}
                </div>
            </div>
        </div>
    )
}