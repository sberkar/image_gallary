import { useState } from "react"
import Link from "next/link"
import Image from "next/image";
import addToFav from "@/utility/addToFav";
import { useAuth } from "@/context/auth";

export default function ImageElement({ image, isLoggedIn, isFaved }){
    const [show, setShow] = useState("invisible")
    const [faved, setFaved] = useState(isFaved?.fav)

    console.log(isFaved?.fav)
    const { currentUser } = useAuth()

    function handleFav(data, uid){
        const res = addToFav(data, data.id, uid)
        if(res?.message != undefined){
            return setFaved(true)
        }
        if(res?.error != undefined){
            console.log(res.error)
        }
    }

    function handleMouseEnter(){
        setShow("visible")
    }
    function handleMouseLeave(){
        setShow("invisible")
    }
    console.log(isFaved)

    return <div className="relative w-full md:w-fit flex flex-col items-center justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       <Link href={`/image/${image.id}`} className="block"> 
        <div>
            <img src={image.webformatURL} loading="lazy" className="h-[250px]" alt="images" />
        </div>
        </Link>
        <div className={`absolute z-10 bottom-0 ${show} w-full transition-all duration-75 ease-in-out`}>
            <div className="flex items-center justify-between p-2 bg-gradient-to-b from-light-white to-slate-900">
                <div className="flex items-center"> 
                <Image src={image.userImageURL} width="36" height="36" className="w-9 h-9 block mr-2 rounded-full" alt="" />
                <p className="text-white"><a href={`https://pixabay.com/users/${image.user}-${image.user_id}`}>{image.user}</a></p>
                </div>
                <div>{isLoggedIn?
                    <button onClick={() => handleFav(image, currentUser.uid)}>
                    <span className="text-white text-3xl"><ion-icon name={`${!(faved == true)?"heart-outline":"heart"}`}></ion-icon></span>
                    </button>:<Link href="/login">
                    <span className="text-white text-3xl"><ion-icon name="heart-outline"></ion-icon></span>
                    </Link>}
                </div>
            </div>
        </div>
    </div>
}