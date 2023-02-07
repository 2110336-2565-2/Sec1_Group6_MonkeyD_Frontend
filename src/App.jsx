import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import NoPage from "./pages/NoPage";
import SigninPage from "./pages/SigninPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  );
};

export default App;
