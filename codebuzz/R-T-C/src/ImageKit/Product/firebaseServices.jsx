import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../../Firebase/firebaseconfig";

// collection-Product
const productCollection = collection(firestoreDB, "products");

// Doc-Product
const productDoc = (id) => {
    return doc(firestoreDB, "products", id);
}

// Get-Product
export const GetProducts = async () => {
    try {
        const res = await getDocs(productCollection);
        console.log("Get-Product++", res);

        return res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
        console.error('Error-Get-Product--', err);
    }
}


// Post-Product
export const PostProduct = async (data) => {
    try {
        const res = await addDoc(productCollection, data);
        // console.log("Post-Product++", res);

        return res;
    } catch (err) {
        console.error('Error-Post-Product--', err);
    }
}


// Update-Product
export const PutProduct = async (id, data) => {
    try {
        const res = await updateDoc(productDoc(id), data);
        console.log("Put-Product++", res);

        return res;
    } catch (err) {
        console.error('Error-Put-Product--', err);
    }
}

// Delete-Product
export const DeleteProduct = async (id) => {
    try {
        const res = await deleteDoc(productDoc(id));
        console.log("Delete-Product++", res);

        return res;
    } catch (err) {
        console.error('Error-Delete-Product--', err);
    }
}
