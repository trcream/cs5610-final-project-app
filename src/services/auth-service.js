import axios from "axios";
// Use this for local testing
const SERVER_API_URL = "http://localhost:4000/api/";

// Updating later for deployed server url
// const SERVER_API_URL =
//   "https://trcream-tuiter-node-server-app.herokuapp.com/api/";

// const USERS_URL = `${SERVER_API_URL}/users`;
const USERS_URL = `${SERVER_API_URL}users`;

// alert("Users Url:" + USERS_URL);

const api = axios.create({
  baseURL: SERVER_API_URL,
  withCredentials: true,
});

export const login = async ({ username, password }) => {
  const response = await api.post(`${USERS_URL}/login`, { username, password });
  console.log("Auth Service Login Call");
  console.log(response.data);
  const user = response.data;
  return user;
};

export const logout = async () => {
  const response = await api.post(`${USERS_URL}/logout`);
  return response.data;
};
export const profile = async () => {
  const response = await api.post(`${USERS_URL}/profile`);
  return response.data;
};
export const updateUser = async (user) => {
  console.log("updateUser service called " + user._id);
  // const response = await api.put(`${USERS_URL}/${user._id}`, user);
  //dispatch here?
  const response = await api.put(`${USERS_URL}/update/${user._id}`, user);
  console.log(`${USERS_URL}/${user._id}`);
  return response.data;
};
export const register = async ({
  username,
  password,
  firstName,
  lastName,
  userType,
}) => {
  const response = await api.post(`${USERS_URL}/register`, {
    username,
    password,
    firstName,
    lastName,
    userType,
  });
  const user = response.data;
  return user;
};

// service to get user by their unique id
export const getUserById = async (userId) => {
  const response = await api.get(`${USERS_URL}/${userId}`);
  const user = response.data;
  return user;
};

// service to get a list of all the users
export const findAllUsers = async () => {
  console.log("Searching for all users " + USERS_URL);
  const response = await api.get(USERS_URL);
  return response.data;
};

export const followUser = async (uid, otherUserId) => {
  console.log(
    "User Id: " +
      uid +
      " Other User Id: " +
      otherUserId +
      " USERS_URL: " +
      USERS_URL
  );

  const response = await api.post(`${USERS_URL}/${uid}/follow/${otherUserId}`);
  return response.data;
};

export const unfollowUser = async (uid, otherUserId) => {
  const response = await api.post(
    `${USERS_URL}/${uid}/unfollow/${otherUserId}`
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  alert("Delete User Service Called" + userId);
  const response = await api.delete(`${USERS_URL}/${userId}`);
  return response.data;
};
