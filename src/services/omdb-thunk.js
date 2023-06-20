import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies } from "../services/omdbService";

export const searchMoviesThunk = createAsyncThunk(
  "movies/searchMovies",
  async (searchTerm) => {
    const movies = await searchMovies(searchTerm);
    return movies;
  }
);
