import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/AuthSlice";
import AccountSlice from "./slices/AccountSlice";
import BlogsSlice from "./slices/BlogsSlice";
import FaqsSlice from "./slices/FaqsSlice";
import ContactSlice from "./slices/ContactSlice";

import HomeSlice from "./slices/HomeSlice";
import ComplaintSlice from "./slices/ComplaintSlice";
import PolicySlice from "./slices/PolicySlice";

import ProductSlice from "./slices/ProductSlice";

import CartSlice from "./slices/CartSlice";
import PaymentSlice from "./slices/PaymentSlice";

import ChatBotSlice from "./slices/ChatBotSlice";


const rootReducer = combineReducers({
    UserAuth: AuthSlice,

    UserAccount: AccountSlice,

    Blogs: BlogsSlice,
    Faqs: FaqsSlice,
    Contact: ContactSlice,

    Home: HomeSlice,
    Complaint: ComplaintSlice,
    Policy: PolicySlice,

    Product: ProductSlice,

    Cart: CartSlice,
    Payment: PaymentSlice,

    ChatBot: ChatBotSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;