import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import ImageElement from "../../components/Image";
import { useAuth } from "@/context/auth";
import Link from "next/link";

export default function ImageID(){
    let router = useRouter()
    let { image_id } = router.query;

    let { isLoggedIn } = useAuth()

    let shareOptions = [{
        name: "logo-facebook",
        color: "blue",
        link: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
    }, {
        name: "logo-twitter",
        color: "#1DA1F2",
        link: `https://twitter.com/intent/tweet?url=${window.location.href}&text=`
    }, {
        name: "copy-outline",
        color: "#c0c0c0",
        link: `${window.location.href}`
    }]

    const [imageData, setImageData] = useState({});
    const [relatedImages, setRelatedImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [relatedLoading, setRelatedLoading] = useState(true)
    const [copied, setCopied] = useState(false)
    const [social, setSocial] = useState(false)

    const downloader = useRef()
    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXA_API}&id=${image_id}&image_type=photo&pretty=true`).then(res => {
            res.json().then(data => {
                setImageData(data.hits[0])
                setLoading(false)
            })
        }).catch(err => console.log(err))
    }, [image_id])

    useEffect(() => {
        if(imageData.tags == undefined) return
        let url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXA_API}&q=${imageData.tags.split(",")[0]}&image_type=${imageData.type}&per_page=6&image_type=photo&pretty=true`;
        fetch(encodeURI(url)).then(res => {
            res.json().then(data => {
                setRelatedImages(data.hits)
                setRelatedLoading(false)
            })
            .catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [imageData])

    function downloadImage(url){
        fetch(url).then(res => {
            res.blob().then(blob => {
                let tempURL = URL.createObjectURL(blob)
                downloader.current.href = tempURL;
                downloader.current.download = url.replace(/^.*[\\\/]/, '');
                downloader.current.click()
                URL.revokeObjectURL(tempURL)
                downloader.current.remove()
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
    if(copied){
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }
    window.addEventListener("click", (e) => {
        if(e.target.id === "social-icon"){
            return setSocial(!social)
        }
        if(e.target.id === "social-name"){
            return setSocial(!social)
        }
        if(e.target.id === "social"){
            return setSocial(!social)
        }
        setSocial(false)
    })
    function copyToClipBoard(text){
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
        }).catch(err => console.log(err))
    }
    return <>
        <Head>
            <title>Photo by {imageData.user} - Colrs Image</title>
        </Head>
        <Nav />
        <main className="px-0 md:px-8 my-2 md:my-4">
            {loading?<Loading />:
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <img className="md:rounded w-screen md:w-auto" src={imageData.webformatURL} alt="image" />
                </div>
                <div className="px-2">
                    <h1 className="text-3xl md:text-4xl font-medium">Photo By {imageData.user}</h1>
                    <div className="my-2">
                        <a className="flex items-center " href={`https://pixabay.com/users/${imageData.user}-${imageData.user_id}`}>
                        <Image width="36" height="36" className="rounded-full mr-2" src={imageData.userImageURL} alt={imageData.user} />
                        <span className="text-lg font-medium">{imageData.user}</span>
                        </a>
                    </div>
                    <p className="my-2 text-xl font-medium">Likes - {imageData.likes}</p>
                    <p className="my-2 text-xl font-medium">Downloads - {imageData.downloads}</p>
                    <p className="my-2 flex">{imageData.tags.split(",").map(tag => <a href={`/tag/${tag}`} key={tag} className="px-2 py-1 bg-slate-300 rounded-xl first:ml-0 mx-2 block">{tag}</a>)}</p>
                    <div className="p-4 my-8 bg-slate-100 rounded">
                        <a href="https://pixabay.com/service/terms/" className="text-xl hover:underline font-semibold">Pixabay License</a>
                        <p className="leading-[95%] text-slate-600">Free to use under the Pixabay license<br />
No attribution required</p>
                    </div>
                    <div className="flex items-center">
                        <button className="px-4 py-2 text-white hover:opacity-90  flex items-center bg-primary rounded" onClick={() => downloadImage(imageData.webformatURL)} >
                            <span className="text-2xl mr-2">
                                <ion-icon name="download-outline"></ion-icon> 
                            </span> 
                            Download</button>
                        <button id="social" className="social relative flex items-center font-medium mx-4">
                            <span className="text-2xl mr-2">
                                <ion-icon id="social-icon" name="share-social-outline"></ion-icon>
                            </span>
                            <span id="social-name" className="">Share</span>
                            <div className={`${social?"block":"hidden"} absolute bg-white  px-2 py-1 top-[-50px] shadow`}>
                                <div className="flex justify-evenly">
                                    {shareOptions.map(shareOption => <div key={shareOption.name}>
                                        {shareOption.name != "copy-outline"?<a className={`text-[${shareOption.color}] mx-2 text-xl`} href={shareOption.link}>
                                            <ion-icon name={shareOption.name}></ion-icon>
                                        </a>:<button onClick={() => copyToClipBoard(shareOption.link)} className={`relative text-[${shareOption.color} mx-2 text-xl]`}>
                                            <ion-icon name={shareOption.name}></ion-icon>
                                            <span className="absolute top-[30px] bg-white p-2 shadow rounded">{copied?"copied": ""}</span>
                                        </button>}
                                    </div>)}
                                </div>
                            </div>
                        </button>
                        {isLoggedIn?<button className="flex text-primary font-medium items-center mx-2">
                            <span className="text-2xl mr-2">
                                <ion-icon name="heart-outline"></ion-icon>
                            </span>
                            <span>Favourite</span>
                        </button>:<Link href="/login" className="flex text-primary font-medium items-center mx-2">
                            <span className="text-2xl mr-2">
                                <ion-icon name="heart-outline"></ion-icon>
                            </span>
                            <span>Favourite</span>
                        </Link>}
                    </div>
                </div>
            </div>
}
            <div>
                <h2 className="my-8 text-3xl font-medium">More Like This</h2>
                <div className="flex">
                    {relatedLoading?<Loading />:relatedImages.map(relatedImage => <div key={relatedImage.id}>
                        {relatedImage.id == image_id ?"":<ImageElement image={relatedImage} />}
                    </div>)}
                </div>
            </div>
        </main> 
        <Footer />
        <a className="hidden" ref={downloader}></a>
    </>
}