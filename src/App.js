import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";

import { Routes, Route } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeScreen from "./home-screen";
import NavigationSidebar from "./navigation-sidebar/navigation-sidebar";
import ProfileScreen from "./profile-screen";
import SearchScreen from "./search-screen";
import LoginScreen from "./login-screen";
import RegisterScreen from "./register-screen";

import GetUserByIdPage from "./profile-screen-uid";
import UserList from "./users-screen";
import ReviewsScreen from "./reviews-screen";
import MovieDetails from "./details-screen";
import MoviesScreen from "./movies-screen";
import SideBar from "./right-side-bar";
import AdminUserList from "./admin-only-screen";
import CriticProfileScreen from "./critic-profile-screen";
import CriticsScreen from "./critics-screen";

import store from "../src/store.js";
import Nav from "./nav";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <div className="col-13 d-flex justify-content-center">
            <img
              src="./images/movie-banner-1300-cropped.png"
              alt="Banner"
              className="img-fluid"
              style={{ maxHeight: "250px" }}
            />
          </div>
          <div className="mx-13">
            <Nav />
            <div className="row"></div>
            <div className="row">
              <div className="col-2 d-none d-md-block">
                <NavigationSidebar />
              </div>
              <div className="col-lg-7  col-md-9 col-sm-9">
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<HomeScreen />} />
                  <Route path="/Profile" element={<ProfileScreen />} />
                  <Route path="/Profile/:uid" element={<GetUserByIdPage />} />
                  <Route path="/Search" element={<SearchScreen />} />
                  <Route path="/search/:criteria" element={<SearchScreen />} />
                  <Route path="/Movies" element={<MoviesScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/Users" element={<UserList />} />
                  <Route path="/Reviews" element={<ReviewsScreen />} />
                  <Route path="/Details/:imdbID" element={<MovieDetails />} />
                  <Route path="/admin" element={<AdminUserList />} />
                  <Route path="/critic" element={<CriticProfileScreen />} />\
                  <Route path="/Critics" element={<CriticsScreen />} />
                  {/* Login/ Register here */}
                </Routes>
              </div>
              <div className="col-3  d-none d-md-block">
                <SideBar />
                {/* <WhoToFollowList />
              <h1>Who to follow or recent reviews</h1> */}
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
