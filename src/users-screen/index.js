import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/auth-service";

function GetUserByIdPage() {
  const { uid } = useParams(); // Extract the user ID from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(uid);
        setUser(response);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, [uid]);

  return (
    <div>
      <h1>Get User by ID</h1>
      {user ? (
        <div>
          <h2>User Details:</h2>
          <p>ID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>User Type: {user.userType}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}

export default GetUserByIdPage;
