import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/auth-service";
import UserReviews from "../components/user-reviews-component";

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
    <div className="container">
      <div className="row">
        <div className="col-md-12">
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
        <div className="col-12 mb-2">
          {" "}
          <UserReviews />
        </div>
      </div>
    </div>
  );
}

export default GetUserByIdPage;
