import { createSlice } from "@reduxjs/toolkit";
import { reqtoAddContact } from "../services/ContactServices";

const initialState = {
    loader: false,
    error: null
}

const ContactSlice = createSlice({
    name: "ContactSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoAddContact
        builder.addCase(reqtoAddContact.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoAddContact.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoAddContact.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default ContactSlice.reducer;