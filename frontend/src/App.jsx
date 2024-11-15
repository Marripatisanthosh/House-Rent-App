import React, { useEffect } from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import "react-phone-input-2/lib/style.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./components/blocks/loading";
import Navbar from "./components/navbar";
import useFetchRequests from "./hooks/chat/useFetchRequests";
import AddProperty from "./pages/AddProperty";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyProperties from "./pages/MyProperties";
import MyRequests from "./pages/MyRequests";
import Register from "./pages/Register";
import UDProperty from "./pages/UDProperty";
import PublicUserProfile from "./pages/UserPage";
import useAuthStore from "./stores/useAuthStore";
import useSocketStore from "./stores/useSocketStore";

function App() {
  const { initializeSocket, closeSocket } = useSocketStore();
  const { loading, fetchRequests } = useFetchRequests();
  const { userData } = useAuthStore();

  useEffect(() => {
    const initSocketAndFetchRequests = async () => {
      initializeSocket(userData);

      if (userData) {
        await fetchRequests();
      }
    };
    initSocketAndFetchRequests();

    if (userData) fetchRequests();

    return () => {
      closeSocket();
    };
  }, [userData]);

  if (loading) <Loading />;

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={userData ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={userData ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/u/:userId" element={<PublicUserProfile />} />
          <Route path="/listing/:propertyId" element={<Listing />} />

          <Route
            path="/properties"
            element={
              userData?.type !== "user" ? <MyProperties /> : <Navigate to="/" />
            }
          />
          <Route
            path="/property/add"
            element={
              userData?.type !== "user" ? <AddProperty /> : <Navigate to="/" />
            }
          />
          <Route
            path="/property/:propertyId"
            element={
              userData?.type !== "user" ? <UDProperty /> : <Navigate to="/" />
            }
          />

          <Route
            path="/admin"
            element={
              userData?.type === "admin" ? <AdminPanel /> : <Navigate to="/" />
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="colored"
          limit={3}
        />
      </Router>
    </>
  );
}

export default App;
