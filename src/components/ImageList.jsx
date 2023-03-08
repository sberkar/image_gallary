import { useState, useEffect } from "react"
import ImageElement from "./Image"
import Loading from "./Loading"

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

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-0 md:px-8">
        {loading?<Loading />:<>
            {images.length < 1?<div>
                No Image Found.
            </div>:<>
                {images.map(image => <ImageElement key={image.id} image={image} />)}
            </>}
        </>}
    </div>
}