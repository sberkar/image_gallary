import { useAuth } from "@/context/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ProfileSideBar from "../components/ProfileSideBar";

export default function Account(){
    const router = useRouter()

    const { logout, currentUser } = useAuth()

    function handleLogout(){
        logout().then(() => {
            router.push("/login")
        }).catch(err => console.log(err))
    }
    return <>
        <Head>
            <title>Account - Colrs Image</title> 
        </Head>
            <Nav />
            <main className="h-[75vh] px-8 my-4 md:flex">
                <ProfileSideBar />
                <div className="w-full flex flex-col items-center">
                    <img src={currentUser.photoURL} alt="Profile" className="rounded-full" />
                <h2 className="text-2xl md:text-3xl mt-3 font-bold">{currentUser.displayName}</h2>
                <p className="mt-3 text-md text-slate-800">{currentUser.email}</p>
                <button className="mt-3 py-2 px-4 text-[red] rounded border-[red] border" onClick={() => handleLogout()}>Logout</button>
                </div>
            </main>
            <Footer />
    </>
}