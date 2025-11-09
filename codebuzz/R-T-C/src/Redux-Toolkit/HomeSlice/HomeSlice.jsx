import { createSlice } from "@reduxjs/toolkit";
import { deleteuser, getsingaluser, getuser, postuser, putuser } from "./User-Api/AxiosApi";

const HomeSlice = createSlice({
    name: "user",
    initialState: {
        loader: false,
        error: null,
        users: [],
        user: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        // Get User 
        builder.addCase(getuser.pending, (state, action) => {
            console.log("getuser pending ⌛", action);
            state.loader = true;
        })
        builder.addCase(getuser.fulfilled, (state, action) => {
            console.log("getuser fulfilled ✅", action);
            state.loader = false;
            state.users = action.payload;
            state.error = null;
        })
        builder.addCase(getuser.rejected, (state, action) => {
            console.log("getuser rejected 🚫", action);
            state.loader = false;
            state.error = action.payload;
        })


        // Post User 
        builder.addCase(postuser.pending, (state, action) => {
            console.log("postuser pending ⌛", action);

            state.loader = true;
        })
        builder.addCase(postuser.fulfilled, (state, action) => {
            console.log("postuser fulfilled ✅", action);

            state.loader = false;
            state.users = [...state.users, action.payload.data];
            // state.error = null;
        })
        builder.addCase(postuser.rejected, (state, action) => {
            console.log("postuser rejected 🚫", action);

            state.loader = false;
            state.error = action.payload;
        })


        // Delete User 
        builder.addCase(deleteuser.pending, (state, action) => {
            console.log("deleteuser pending ⌛", action);

            state.loader = true;
        })
        builder.addCase(deleteuser.fulfilled, (state, action) => {
            console.log("deleteuser fulfilled ✅", action);

            state.loader = false;
            state.users = state.users.filter((i) => i.id !== action.payload);
            // state.error = null;
        })
        builder.addCase(deleteuser.rejected, (state, action) => {
            console.log("deleteuser rejected 🚫", action);

            state.loader = false;
            state.error = action.payload;
        })


        // Get Singal-User 
        builder.addCase(getsingaluser.pending, (state, action) => {
            console.log("getsingaluser pending ⌛", action);

            state.loader = true;
        })
        builder.addCase(getsingaluser.fulfilled, (state, action) => {
            console.log("getsingaluser fulfilled ✅", action);

            state.loader = false;
            state.user = action.payload;
            // state.error = null;
        })
        builder.addCase(getsingaluser.rejected, (state, action) => {
            console.log("getsingaluser rejected 🚫", action);

            state.loader = false;
            state.error = action.payload;
        })  


        // Put User 
        builder.addCase(putuser.pending, (state, action) => {
            console.log("putuser pending ⌛", action);

            state.loader = true;
        })
        builder.addCase(putuser.fulfilled, (state, action) => {
            console.log("putuser fulfilled ✅", action);

            state.loader = false;
            state.users = state.users.map((i)=> i.id === action.payload.data.id ? action.payload.data : i);
            state.user = {};
            // state.error = null;
        })
        builder.addCase(putuser.rejected, (state, action) => {
            console.log("putuser rejected 🚫", action);

            state.loader = false;
            state.error = action.payload;
        })

    }
});

// console.log("Redux-Toolkit HomeSlice :- ", HomeSlice);


export default HomeSlice.reducer;