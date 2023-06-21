import axios from "axios";

// const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = "https://tuiter-node-server-app-7ua3.onrender.com/api/movies";
const MOVIES_API = "http://localhost:4000/api/movies";

// Updating for hw6 to work from heroku
// const TUITS_API =
//   "https://trcream-tuiter-node-server-app.herokuapp.com/api/movies/";

// const TUITS_API = `${API_BASE}/tuits`;
// alert(TUITS_API);

export const createMovie = async (movie) => {
  console.log("Creating a new movie" + JSON.stringify(movie));
  console.log(MOVIES_API);
  const response = await axios.post(MOVIES_API, movie);
  return response.data;
};

// export const findMovie = async () => {
//   const response = await axios.get(TUITS_API);
//   const tuits = response.data;
//   return tuits;
// };

// export const deleteMovie = async (tid) => {
//   //   alert("delteing tuit with id " + tid);
//   const response = await axios.delete(`${TUITS_API}/${tid}`);
//   return response.data;
// };

// export const updateMovie = async (tuit) => {
//   const response = await axios.put(`${TUITS_API}/${tuit._id}`, tuit);
//   return tuit;
// };
