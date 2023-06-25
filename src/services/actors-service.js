import axios from "axios";

const ACTORS_API = "http://localhost:4000/api/actors";
export const createActor = async (name, imdbId) => {
  console.log(
    "Creating a new actor from service: " + name + ", imdbId: " + imdbId
  );
  const actor = { name, imdbId };
  const response = await axios.post(ACTORS_API, actor);
  return response.data;
};

export const updateActorByName = async (name, actor) => {
  console.log("Updating actor: " + name);
  const response = await axios.put(`${ACTORS_API}/name/${name}`, actor);
  return response.data;
};

export const findActorByName = async (name) => {
  console.log("Finding actor by name: " + name);
  const response = await axios.get(`${ACTORS_API}/name/${name}`);
  return response.data;
};
