import { useAuth } from "@/context/auth"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import Logo from "../../public/logo.svg"

export default function Nav(){
    const [open, setOpen] = useState(false)
    const { currentUser } = useAuth()

    return <header>
        <nav className="relative p-2 md:px-8 md:py-4 md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center md:w-1/4">
                <Link href="/"> 
                <Image className="h-12 ml-[-10px]" src={Logo} alt="logo" />
                </Link>
                <button className="relative z-20 md:hidden" onClick={() => setOpen(!open)}>
                    <span className="text-3xl">
                        <ion-icon name={`${open?"close":"menu"}`}></ion-icon>
                    </span>
                </button>
            </div>
            <div className={`${open?"flex": "hidden"} bg-white items-center justify-center top-0 left-0 z-10 md:bg-auto fixed w-screen h-screen md:w-auto md:h-auto md:static   md:block`}>
                
                <ul className="flex flex-col md:flex-row items-center">
                    <li className="mx-4">
                        <Link className="font-medium text-xl md:text-md " href="/illustrations">Illustrations</Link>
                    </li>
                    <li className="mx-4">
                        <Link className="font-medium text-xl md:text-md" href="/videoes">Videoes</Link>
                    </li>
                    {!currentUser?
                    <li className="mx-4">
                        <Link className="block font-medium text-md py-2 px-4 rounded-md border border-black bg-primary" href="/login">Login</Link>
                    </li>:<li className="mx-4">
                            <Link href="/profile" className="font-medium text-xl md:text-md"> 
                                {open?"Profile":<Image height="48" width="48" src={currentUser.photoURL} className="rounded-full h-[48px] w-[48px]" alt="profile" />}
                            </Link>
                        </li>}
                </ul>
            </div>
        </nav>
    </header>
}