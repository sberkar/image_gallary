import Video from "@/components/Video";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";

export default function Tag(){
    let router = useRouter()
    let { tag } = router.query

    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let url = `https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXA_API}&q=${tag}&image_type=photo&pretty=true`;
        fetch(encodeURI(url)).then(res => {
            res.json().then(data => {
                setVideos(data.hits);
                setLoading(false)
            })
        })
    }, [tag])

    return <>
        <Head>
            <title>{tag} - Colrs Image</title> 
        </Head>
        <Nav />
        <main className="px-0 sm:px-5 md:px-10 my-2 md:my-10">
            {loading?<Loading />:<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {videos.map(video => <Video key={video.id} video={video} />)}
                </div>}
        </main>
        <Footer />
    </>
}