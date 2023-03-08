import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import Video from "../../components/Video";

export default function ImageID(){
    let router = useRouter()
    let { video_id } = router.query;

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

    const [videoData, setVideoData] = useState({});
    const [relatedVideos, setRelatedVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [relatedLoading, setRelatedLoading] = useState(true)
    const [copied, setCopied] = useState(false)
    const [social, setSocial] = useState(false)

    const downloader = useRef()
    useEffect(() => {
        fetch(`https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXA_API}&id=${video_id}&pretty=true`).then(res => {
            res.json().then(data => {
                setVideoData(data.hits[0])
                setLoading(false)
            })
        }).catch(err => console.log(err))
    }, [video_id])

    useEffect(() => {
        if(videoData.tags == undefined) return
        let url = `https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXA_API}&q=${videoData.tags.split(",")[0]}&per_page=4&pretty=true`;
        fetch(encodeURI(url)).then(res => {
            res.json().then(data => {
                setRelatedVideos(data.hits)
                setRelatedLoading(false)
            })
            .catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [videoData])

    function downloadVideo(url){
        fetch(url).then(res => {
            res.blob().then(blob => {
                let href = URL.createObjectURL(blob)
                downloader.current.href = href;
                downloader.current.download = `${videoData.id}.mp4`
                downloader.current.click()
                URL.revokeObjectURL(href)
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
        console.log(e.target.id)
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
            <title>Video by {videoData.user} - Colrs Image</title>
        </Head>
        <Nav />
        <main className="px-0 md:px-8 my-4">
            {loading?<Loading />:
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <video controls controlsList="nodownload" className="md:rounded w-full md:w-11/12" src={videoData.videos.large.url}></video>
                </div>
                <div className="px-2">
                    <h1 className="text-3xl md:text-4xl font-medium">Video By {videoData.user}</h1>
                    <div className="my-2">
                        <a className="flex items-center " href={`https://pixabay.com/users/${videoData.user}-${videoData.user_id}`}>
                        <Image width="36" height="36" className="rounded-full mr-2" src={videoData.userImageURL} alt={videoData.user} />
                        <span className="tex-lg font-medium">{videoData.user}</span>
                        </a>
                    </div>
                    <p className="my-2 font-medium">Likes - {videoData.likes}</p>
                    <p className="my-2 font-medium">Downloads - {videoData.downloads}</p>
                    <p className="my-2 flex">{videoData.tags.split(",").map(tag => <a href={`/tag/${tag}`} key={tag} className="px-2 py-1 bg-slate-300 rounded-xl first:ml-0 mx-2 block">{tag}</a>)}</p>
                    <div className="p-4 my-8 bg-slate-100 rounded">
                        <a href="https://pixabay.com/service/terms/" className="text-xl hover:underline font-semibold">Pixabay License</a>
                        <p className="leading-[95%] text-slate-600">Free to use under the Pixabay license<br />
No attribution required</p>
                    </div>
                    <div className="flex items-center">
                        <button className="px-4 py-2 text-white hover:opacity-90  flex items-center bg-primary rounded" onClick={() => downloadVideo(videoData.videos.large.url)} >
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
                    </div>
                </div>
            </div>
}
            <div>
                <h2 className="my-8 text-3xl font-medium">More Like This</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-1">
                    {relatedLoading?<Loading />:relatedVideos.map(relatedvideo => (relatedvideo.id === video_id?"":<div key={relatedvideo.id}>
                        <Video video={relatedvideo} height="170" />
                    </div>))}
                </div>
            </div>
        </main> 
        <Footer />
        <a className="hidden" ref={downloader}></a>
    </>
}