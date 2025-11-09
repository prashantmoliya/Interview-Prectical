import { createSlice } from "@reduxjs/toolkit";
import { reqtoAddAddressDetail, reqtoGetOrderSummary, reqtoPaymentFetch } from "../services/PaymentServices";
import { reqtoChatBot } from "../services/ChatBotServices";

const initialState = {
    loader: false,

    chatbotReply: '',

    error: null
}

const ChatBotSlice = createSlice({
    name: "ChatBotSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoChatBot
        builder.addCase(reqtoChatBot.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoChatBot.fulfilled, (state, action) => {
            state.loader = false;
            state.chatbotReply = action.payload?.reply;
        });
        builder.addCase(reqtoChatBot.rejected, (state, action) => {
            state.loader = false;
        });
    }

});
export default ChatBotSlice.reducer;   