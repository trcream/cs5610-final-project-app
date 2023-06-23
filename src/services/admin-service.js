import axios from "axios";

const ADMIN_API = "http://localhost:4000/api/admin";

export const createAdmin = async ({
  username,
  password,
  firstName,
  lastName,
}) => {
  const response = await axios.post(`${ADMIN_API}`, {
    username,
    password,
    firstName,
    lastName,
  });
  const admin = response.data;
  return admin;
};

export const updateAdmin = async (admin) => {
  const response = await axios.put(`${ADMIN_API}/update/${admin._id}`, admin);
  return response.data;
};

export const deleteAdmin = async (adminId) => {
  const response = await axios.delete(`${ADMIN_API}/${adminId}`);
  return response.data;
};

export const findAllAdmins = async () => {
  const response = await axios.get(ADMIN_API);
  return response.data;
};
