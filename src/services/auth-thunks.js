import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

// wrapping the login service function in a thunk and passing the instance
// to the server
export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials) => {
    const user = await authService.login(credentials);
    return user;
  }
);

export const profileThunk = createAsyncThunk("auth/profile", async () => {
  return await authService.profile();
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (user) => {
    await authService.updateUser(user);
    return user;
  }
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (credentials) => {
    const user = await authService.register(credentials);
    return user;
  }
);

//Thunk to get user by their unique id

export const getUserByIdThunk = createAsyncThunk(
  "user/getUserById",
  async (userId) => {
    const user = await authService.getUserById(userId);
    return user;
  }
);
