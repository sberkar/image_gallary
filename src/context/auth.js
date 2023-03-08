import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/firebase_config";

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthContextProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setCurrentUser(user)
                setIsLoggedIn(true)
            }
            setLoading(false)
        })
        return unsubscribe()
    }, [])

    function login(){
        return signInWithPopup(auth, provider)
    }
    function logout(){
        return signOut(auth)
    }

    const value = {
        currentUser,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn
    }
    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
}