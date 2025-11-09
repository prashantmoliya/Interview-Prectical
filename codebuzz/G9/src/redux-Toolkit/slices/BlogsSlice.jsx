import { createSlice } from "@reduxjs/toolkit";
import { reqtoGetBlogs, reqtoGetBlogsDetail, reqtoGetMedia } from "../services/BlogsServices";

const initialState = {
    loader: false,

    blogsList: [],
    blogsListPagination: {},
    blogsDetail: {},

    mediaList: [],
    mediaListPagination: [],

    error: null
}

const BlogsSlice = createSlice({
    name: "BlogsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoGetBlogs
        builder.addCase(reqtoGetBlogs.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetBlogs.fulfilled, (state, action) => {
            state.loader = false;

            state.blogsList = action.payload?.data;
            state.blogsListPagination = action.payload?.pagination;
        });
        builder.addCase(reqtoGetBlogs.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetBlogsDetail
        builder.addCase(reqtoGetBlogsDetail.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetBlogsDetail.fulfilled, (state, action) => {
            state.loader = false;

            state.blogsDetail = action.payload?.data;
        });
        builder.addCase(reqtoGetBlogsDetail.rejected, (state, action) => {
            state.loader = false;
        });


        // reqtoGetMedia
        builder.addCase(reqtoGetMedia.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(reqtoGetMedia.fulfilled, (state, action) => {
            state.loader = false;

            state.mediaList = action.payload?.data;
            state.mediaListPagination = action.payload?.pagination;
        });
        builder.addCase(reqtoGetMedia.rejected, (state, action) => {
            state.loader = false;
        });
    }
});

export default BlogsSlice.reducer;