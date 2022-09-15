import { createSlice } from "@reduxjs/toolkit";

export const Postslice = createSlice({
  name: "post",
  initialState: {
    post: []
  },
  reducers: {
    postinsert: (state, action) => {
      state.post = action.payload;
    },
    logout: (state) => {
      state.post = null;
    }
  }
});

export const { postinsert, logout } = Postslice.actions;
export const selectPost = (state) => state.post.post;
export default Postslice.reducer;
