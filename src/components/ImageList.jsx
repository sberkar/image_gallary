import { useAuth } from "@/context/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useState, useEffect } from "react"
import ImageElement from "./Image"
import { db } from "@/firebase_config"

export default function ImageList(){
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [favImages, setFavImages] = useState([])
    const [favLoading, setFavLoading] = useState(true)

    const { isLoggedIn, currentUser } = useAuth()

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXA_API}&q=&image_type=photo&pretty=true`).then(res => {
            res.json().then(data => {
                setImages(data.hits)
                setLoading(false)
            })
        }
        ).catch(err => console.log(err))
        
        let q = query(collection(db, "favs"), where("userId", "==", currentUser.uid))
        getDocs(q).then(qs => {
            setFavImages(qs.docs.map(doc => doc.data()))
            setFavLoading(false)
        })
    }, [])

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 px-0 md:px-8">
        {images.length && !loading && !favLoading && images.map(image => <ImageElement key={image.id} image={image} isLoggedIn={isLoggedIn} isFaved={favImages.find(FI => FI.id == image.id)} />)}
    </div>
}