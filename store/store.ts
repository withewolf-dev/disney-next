import { configureStore } from "@reduxjs/toolkit";
import cinemaSliceReducer from "../slice/cinema-slice";

export const store = configureStore({
  reducer: {
    cinema: cinemaSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
