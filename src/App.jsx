import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import NoPage from "./pages/NoPage";
import SigninPage from "./pages/SigninPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signin" element={<SigninPage signin/>} />
          <Route path="/signup" element={<SigninPage signup/>} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
        <Navbar />
      </BrowserRouter>
    </>
  );
};

export default App;
