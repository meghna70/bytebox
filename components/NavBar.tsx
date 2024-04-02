import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { ToggleSwitch } from './ui/ToggleSwitch'

interface NavBarProps {
    color: string;
}
function NavBar( props : NavBarProps) {
   
    return (
        <div style={{ justifyContent: "space-between", padding: 24 }} className="bg-[#0F172A] flex flex-row items-center justify-between">
            <Link href="/">
                <div style={{ fontWeight:"bold", fontSize:20, color:"white" }} className="font-bold text-xl">
                Bytebox
        </div>
            </Link >
        <div style={{ gap: 23 }} className="px-5 flex flex-row  space-x-2 items-center justify-between">
            <ToggleSwitch />
            <UserButton afterSignOutUrl="/" />
            <SignedOut>
                <SignInButton afterSignInUrl="/dashboard" mode="modal" />
            </SignedOut>
        </div>
        </div >
    )
}

export default NavBar