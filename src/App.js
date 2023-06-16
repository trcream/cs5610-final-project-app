import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeScreen from "./home-screen";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeScreen />} />
          // Login/ Register here
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
