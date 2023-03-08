import { useAuth } from "@/context/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Image from "next/image";
import ImageElement from "../../components/Image";
import Nav from "../../components/Nav";
import ProfileSideBar from "../../components/ProfileSideBar";
import { db } from "@/firebase_config.js";

export default function Favourites(){
    const { currentUser } = useAuth()
    const router = useRouter();

    const [favs, setFavs] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(!currentUser) return
        let q = query(collection(db, "favs"), where("userId", "==", currentUser.uid), limit(20))
        getDocs(q).then(querySnaps => {
            setFavs(querySnaps.docs.map(doc => doc.data()))
            setLoading(false)
        }).catch(err => console.log(err))
    }, [currentUser])

    if(!currentUser) return window.location.replace("/login")

    return <>
        <Head>
            <title>Favourites - Colrs Image</title> 
        </Head>
            <Nav />
            <main className="h-[75vh] px-8 my-4 md:flex">
                <ProfileSideBar />
                <div className="w-full flex flex-col">
                    {!loading ? <div className="w-full grid grid-cols-3 gap-1 px-4">
                            {favs.length < 1?<div className="w-full flex justify-center items-center">
                                <div className="">
                                    <img src="/not_found.svg" className="h-[60vh]" alt="nothing here" />
                                </div>
                            </div>:favs.map(fav => <ImageElement isFaved={fav} key={fav.id} image={fav} />)} 
                        </div>:<div>Loading....</div>}
                </div>
            </main>
            <Footer />
    </>
}