import { useState, useEffect } from "react"
import ImageElement from "./Image"

export default function ImageList(){
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXA_API}&q=&image_type=photo&pretty=true`).then(res => {
            res.json().then(data => {
                setImages(data.hits)
                setLoading(false)
            })
        }
        ).catch(err => console.log(err))
    }, [])

    return <div className="grid grid-cols-4 gap-1 px-8">
        {images.length && !loading && images.map(image => <ImageElement key={image.id} image={image} />)}
    </div>
}