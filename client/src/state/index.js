import { createSlice } from "@reduxjs/toolkit";

// Define initialState
const initialState = {
  mode: "dark", // represents either dark mode or light mode
  user: null,
  token: null,
  posts: [],
};

// Create a slice, the syntax is as follows :-
// createSlice({ name , initialState , reducers })
// https://redux-toolkit.js.org/api/createSlice

// `createSlice` returns an object with two keys:-
// -- 'actions' : action creators used to dispatch actions
// -- 'reducer' : represents the store's reducer function
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // When 'setLogin' reducer is called (via the 'login' function
    // in "client\src\scenes\loginPage\Form.jsx"), the 'user' and 'token'
    // values are updated. These updated values are made available
    // via the "action.payload" property.
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // When 'setFriends' reducer is called (via the 'patchFriend' function
    // in "client\src\components\Friend.jsx"), the value of 'friends' is
    // updated. The updated value is made available via the "action.payload"
    // property.
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent: :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Goes through a list of posts and find the post that was just
    // updated. If found, it'll be replaced with 'action.payload.post'.
    // If none, we'll just return the original 'post'.
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Destructures action creators from 'authSlice' and exporting them.
// The action names are determined by the keys provided in the 'reducers' object
// within 'authSlice'.
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Exports reducer functions.
// Reducers will handle actions dispatched to modify the state of 'authSlice'.
// To be imported by 'client\src\index.js' as 'authReducer'.
// (Note: it can be imported as any custom variable name, in this case 'authReducer').
export default authSlice.reducer;
