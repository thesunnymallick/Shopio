import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {
    isAuthauthenticate: false,
    userId: null,
    userName: null,
    userEmail: null,
    userPhoto: null,
  },
  {
    SET_ACTIVE_USER: (state, action) => {
      const { userEmail, userName, userId, userPhoto } = action.payload;
      if (userId && userEmail) {
        state.isAuthauthenticate = true;
        state.userId = userId;
        state.userEmail = userEmail;
        userPhoto ? (state.userPhoto = userPhoto) : (state.userPhoto = null);
        if (userName === null) {
          const newUser = userEmail.substring(0, userEmail.indexOf("@"));
          const NewUserUpper = newUser.slice(0, -10);
          state.userName =
            NewUserUpper.charAt(0).toUpperCase() + NewUserUpper.slice(1);
        } else {
          state.userName = userName;
        }
      }
    },

    REMOVE_ACTIVE_USER: (state) => {
      state.isAuthauthenticate = false;
      state.userId = null;
      state.userEmail = null;
      state.userName = null;
    },
  }
);
