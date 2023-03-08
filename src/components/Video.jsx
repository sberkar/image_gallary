import { useState } from "react"
import Link from "next/link"
import Image from "next/image";

export default function Video({ video, width, height }){
    const [show, setShow] = useState("invisible")
    function handleMouseEnter(){
        setShow("visible")
    }
    function handleMouseLeave(){
        setShow("invisible")
    }

    return <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       <Link href={`/video/${video.id}`} className="block"> 
        <div>
            <video src={video.videos.tiny.url} height={height} className={`h-[${height?"":"230px"}] w-full md:w-auto`} ></video>
        </div>
        <div className={`absolute bottom-0 ${show} w-full transition-all duration-75 ease-in-out`}>
            <div className="flex items-center justify-between p-2 w-full bg-gradient-to-b from-light-white to-slate-900">
                <div className="flex items-center"> 
                <Image src={video.userImageURL} width="36" height="36" className="block mr-2 rounded-full" alt="" />
                <p className="text-white">Video By <a href={`https://pixabay.com/users/${video.user}-${video.user_id}`}>{video.user}</a></p>
                </div>
                <div>
                    <span className="text-white text-3xl"><ion-icon name="heart-outline"></ion-icon></span>
                </div>
            </div>
        </div>
        </Link>
    </div>
}