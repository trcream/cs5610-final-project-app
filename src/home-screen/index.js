import { Routes, Route } from "react-router";
import Nav from "../nav.js";
import NavigationSidebar from "../navigation-sidebar/navigation-sidebar.js";

// import { Provider } from "react-redux";

// import store from "./store";

function HomeScreen() {
  return (
    // <Provider store={store}>
    <div className="mx-13">
      <Nav />
      <div className="row">
        <div className="col-2">
          NavigationSidebar Location
          <NavigationSidebar />
        </div>
        <div className="col-7">
          {/* Routes will show the path when I click on them from the NavigationSidebar */}
          Route Content Here
          <Routes>
            <Route path="/home" element={<HomeScreen />} />
            {/* <Route path="/explore" element={<ExploreScreenJS />} />
            <Route path="/bookmarks" element={<BookmarksScreen />} />
            <Route path="/profile" element={<ProfileScreen />} /> */}
          </Routes>
        </div>
        <div className="col-3">
          Who to follow or movies, etc.
          {/* <WhoToFollowList />
            <h1>Who to follow or recent reviews</h1> */}
        </div>
      </div>
    </div>
    // </Provider>
  );
}

export default HomeScreen;
