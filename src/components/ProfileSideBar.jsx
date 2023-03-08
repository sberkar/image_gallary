import Link from "next/link"
import { useRouter } from "next/router"

export default function ProfileSideBar(){
    const router = useRouter()
    const accountPage = router.pathname === "/profile/account"
    const favPage = router.pathname === "/profile/favourites"

    return <aside>
        <div className="">
            <Link href="/profile/account" className="block">
                <div className={`flex items-center px-4 py-2 w-[300px] ${accountPage?"bg-slate-100 ": "bg-auto"}`}>
                    <span className="text-xl block mr-3">
                        <ion-icon name={`${accountPage?"person":"person-outline"}`}></ion-icon>
                    </span>
                    <span className={`text-lg ${accountPage?"font-medium":""}`}>
                        Account
                    </span>
                </div>
            </Link>
        </div>
        <div className="">
            <Link href="/profile/favourites" className="block">
                <div className={`flex items-center px-4 py-2 w-[300px] ${favPage?"bg-slate-100 ": "bg-auto"}`}>
                    <span className="text-xl block mr-3">
                        <ion-icon name={`${favPage?"heart":"heart-outline"}`}></ion-icon>
                    </span>
                    <span className={`text-lg ${favPage?"font-medium":""}`}>
                        Favourites
                    </span>
                </div>
            </Link>
        </div>
    </aside>
}