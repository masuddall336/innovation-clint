
import { AuthContext } from './AuthContext'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.init';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("current user inside firebase", currentUser);
            setUser(currentUser);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const singInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const singOutUser = () => {
        return signOut(auth)
    }
    const userInfo = {
        user,
        singInUser,
        singOutUser
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
