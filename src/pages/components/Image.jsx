import { useState } from "react"
import Link from "next/link"

export default function Image({ image }){
    const [show, setShow] = useState("invisible")
    function handleMouseEnter(){
        setShow("visible")
    }
    function handleMouseLeave(){
        setShow("invisible")
    }

    return <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       <Link href={`/image/${image.id}`} className="block"> 
        <div>
            <img src={image.webformatURL} loading="lazy" className="h-[250px]" alt="images" />
        </div>
        <div className={`absolute bottom-0 ${show} w-full transition-all duration-75 ease-in-out`}>
            <div className="flex items-center justify-between p-2 w-full bg-gradient-to-b from-light-white to-slate-900">
                <div className="flex items-center"> 
                <img src={image.userImageURL} className="w-9 h-9 block mr-2 rounded-full" alt="" />
                <p className="text-white">Photo By <a href={`https://pixabay.com/users/${image.user}-${image.user_id}`}>{image.user}</a></p>
                </div>
                <div>
                    <span className="text-white text-3xl"><ion-icon name="heart-outline"></ion-icon></span>
                </div>
            </div>
        </div>
        </Link>
    </div>
}