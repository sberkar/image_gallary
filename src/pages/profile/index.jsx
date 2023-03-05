import { useRouter } from "next/router";

export default function Profile(){
    const router = useRouter()
    router.push("/profile/account")
    return <div></div>
}