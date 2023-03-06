import Head from "next/head";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ImageElement from "./components/Image";
import Loading from "./components/Loading";
import Nav from "./components/Nav";

export default function Illustrations(){
    const [illustrations, setIllustrations] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXA_API}&image_type=illustration`)
        .then(res => {
            res.json()
            .then(data => {
                console.log(data.hits);
                setIllustrations(data.hits)
                setLoading(false)
            })
        }).catch(err => console.log(err))
    }, [])

    return <>
        <Head>
            <title>Illustrations - Colrs</title>
        </Head>
        <Nav />
        <main>
            {loading?<Loading />:<div className="grid grid-cols-4 gap-1">
                    {illustrations.map(illustration => <ImageElement key={illustration.id} image={illustration} />)}
                </div>}
        </main>
        <Footer />
    </>
}