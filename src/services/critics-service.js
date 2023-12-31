import axios from "axios";

const CRITIC_API = "http://localhost:4000/api/critic";

export const createCritic = async ({
  username,
  password,
  firstName,
  lastName,
  bio,
  profilePic,
}) => {
  const response = await axios.post(`${CRITIC_API}/`, {
    username,
    password,
    firstName,
    lastName,
    bio,
    profilePic,
  });
  console.log("createCritic service called");
  const critic = response.data;
  return critic;
};

export const updateCritic = async (critic) => {
  const response = await axios.put(`${CRITIC_API}/${critic._id}`, critic);
  return response.data;
};

export const deleteCritic = async (criticId) => {
  const response = await axios.delete(`${CRITIC_API}/${criticId}`);
  return response.data;
};

export const findAllCritics = async () => {
  const response = await axios.get(CRITIC_API);
  return response.data;
};

export const findCriticbyUsername = async (username) => {
  const response = await axios.get(`${CRITIC_API}/username/${username}`);
  return response.data;
};

export const deleteCriticByUsername = async (username) => {
  const response = await axios.delete(`${CRITIC_API}/username/${username}`);
  return response.data;
};
