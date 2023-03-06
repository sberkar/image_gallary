import { useAuth } from "@/context/auth"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import Logo from "../../../public/logo.svg"

export default function Nav(){
    const { currentUser } = useAuth()

    return <header>
        <nav className="px-8 py-4 md:flex md:items-center md:justify-between">
            <div className="md:w-1/4">
                <Link href="/"> 
                <Image src={Logo} alt="logo" />
                </Link>
            </div>
            <div className="">
                
                <ul className="flex items-center">
                    <li className="mx-4">
                        <Link className="font-medium text-md " href="/illustrations">Illustrations</Link>
                    </li>
                    <li className="mx-4">
                        <Link className="font-medium text-md " href="/videoes">Videoes</Link>
                    </li>
                    {!currentUser?
                    <li className="mx-4">
                        <Link className="block font-medium text-md py-2 px-4 rounded-md border border-black bg-primary" href="/login">Login</Link>
                    </li>:<li className="mx-4">
                            <Link href="/profile"> 
                                <Image height="48" width="48" src={currentUser.photoURL} className="rounded-full h-[48px] w-[48px]" alt="profile" />
                            </Link>
                        </li>}
                </ul>
            </div>
        </nav>
    </header>
}