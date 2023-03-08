import Head from "next/head"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";


export default function Login(){
    const router = useRouter()
    const { login, currentUser } = useAuth()

    if((currentUser != undefined)) return window.location.replace("/")

    function handleLogin(){
        login().then(() => {
            window.location.replace("/")
        }).catch(err => console.log(err))
    }
    return <>
        <Head>
            <title>Login - Colrs Image</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
            <Nav />
            <div className="flex flex-col items-center justify-center h-[75vh]">
                <button onClick={() => handleLogin()} className="flex justify-center items-center px-4 py-2 shadow-2xl rounded border-2 border-[#6e6e6e3f]">
                    <span className="text-[#ff0000] text-3xl"> <ion-icon name="logo-google"></ion-icon></span><span className="text-xl mt-[-8px] font-medium ml-2">Sign in with Google</span>
                </button>
            </div>
            <Footer />
    </>
}