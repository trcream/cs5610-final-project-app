import { createAsyncThunk } from "@reduxjs/toolkit";
import * as criticService from "./critics-service.js";

export const createCriticThunk = createAsyncThunk(
  "critic/createCritic",
  async (critic) => {
    console.log("createCriticThunk called");
    const newCritic = await criticService.createCritic(critic);
    return newCritic;
  }
);

export const updateCriticThunk = createAsyncThunk(
  "critics/updateCritic",
  async (critic) => {
    const updatedCritic = await criticService.updateCritic(critic);
    return updatedCritic;
  }
);

export const deleteCriticThunk = createAsyncThunk(
  "critic/deleteCritic",
  async (criticId) => {
    const deletedCritic = await criticService.deleteCritic(criticId);
    return deletedCritic;
  }
);

export const findAllCriticsThunk = createAsyncThunk(
  "critic/findAllCritics",
  async () => {
    const critics = await criticService.findAllCritics();
    return critics;
  }
);
