import { db } from "@/firebase_config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function addToFav(data, id, userId){
    let favDocRef = doc(db, "favs", id.toString())

    console.log(favDocRef)
    getDoc(favDocRef).then(docSnap => {
        if(docSnap.exists()) return { error: "sorry this item is already added to your favourites"}
    }).catch(err => console.log(err));

    setDoc(favDocRef, {...data, fav: true, userId}).then(() => {
        return { message: `${data.type} got added to favourites`}
    }).catch(err => {
        return { error: `${err.message}`}
    })
}