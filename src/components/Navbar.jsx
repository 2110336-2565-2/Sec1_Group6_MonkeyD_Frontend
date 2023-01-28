import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img
        src={require("../assets/images/logo.png")}
        alt="logo"
        className="logo"
      />
      <div className="content-container">
        <nav>
          <Link to="/" className="content">
            HOME
          </Link>
          <Link to="/" className="content">
            FIND CAR
          </Link>
          <Link to="/about" className="content">
            ABOUT US
          </Link>
          <button className="content">CONTACT US</button>
          <button className="profile content">PROFILE</button>
        </nav>
        <i className="fa-regular fa-bell"></i>
      </div>
    </div>
  );
};

export default Navbar;
