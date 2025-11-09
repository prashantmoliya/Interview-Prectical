import { toast } from "react-toastify";
import { unauthorizedUser } from "../slices/AuthSlice";
import { signOut } from "../slices/AccountSlice";
import { clearCart } from "../slices/CartSlice";

export const unauthorized = (errRes, dispatch) => {
    console.warn(errRes);

    dispatch(unauthorizedUser());
    dispatch(signOut());
    dispatch(clearCart());

    toast.error(errRes?.response?.data?.message);
}