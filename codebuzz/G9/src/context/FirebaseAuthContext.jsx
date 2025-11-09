import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const FirebaseAuthContext = createContext();

const FirebaseAuthProvider = ({ children }) => {

    const [firebaseCurrentUser, setFirebaseCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("onAuthStateChanged++", currentUser);

            setFirebaseCurrentUser(currentUser);
        });

        return () => unsubscribe();
    }, []);


    return (
        <FirebaseAuthContext.Provider value={{ firebaseCurrentUser }}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}

export default FirebaseAuthProvider;    