import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Nav from "../components/Nav";
import Video from "../components/Video"

export default function Videoes(){
    const [Videoes, setVideoes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXA_API}`)
        .then(res => {
            res.json()
            .then(data => {
                console.log(data.hits);
                setVideoes(data.hits)
                setLoading(false)
            })
        }).catch(err => console.log(err))
    }, [])

    return <>
        <Head>
            <title>Videoes - Colrs</title>
        </Head>
        <Nav />
        <main>
            {loading?<Loading />:<div className="grid grid-cols-4 gap-1">
                    {Videoes.map(video => <Video key={video.id} video={video} />)}
                </div>}
        </main>
        <Footer />
    </>
}