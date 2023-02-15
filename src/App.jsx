import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import CarDetail from "./pages/CarDetail";
import MyBookingPage from "./pages/MyBookingPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NoPage from "./pages/NoPage";
import SigninPage from "./pages/SigninPage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import AddCarPage from "./pages/AddCarPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signin" element={<SigninPage signin />} />
          <Route path="/signup" element={<SigninPage signup />} />
          <Route path="/mybooking" element={<MyBookingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/carDetail/:carId" element={<CarDetail />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/addCar" element={<AddCarPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
        <Navbar />
      </BrowserRouter>
    </>
  );
};

export default App;
