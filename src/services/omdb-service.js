const OMDB_API_KEY = "4baef882";

export const searchMovies = async (searchTerm) => {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
    searchTerm
  )}&type=movie`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Search || []; // Return the search results or an empty array
  } catch (error) {
    console.error("Error searching movies:", error);
    return []; // Return an empty array on error
  }
};
