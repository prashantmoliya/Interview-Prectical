import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

// signInWithGoogle
export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log("firebase-signInWithGoogle-->", res);

        if (res?.user?.accessToken) {
            return res;
        }
    } catch (err) {
        console.error(err);
    }
};


// signOutWithGoogle
export const signOutWithGoogle = async () => {
    try {
        const res = await signOut(auth);
        console.log("firebase-signOutWithGoogle-->", res);
        console.log("done-signOut");

        return { status: true };
    } catch (err) {
        console.error(err);
    }
};