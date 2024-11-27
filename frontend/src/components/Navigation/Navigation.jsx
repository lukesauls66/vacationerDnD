import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginSignupButton from "./LoginSignupButton";
import { FcHome } from "react-icons/fc";
import "./Navigation.css";

function Navigation({ isUserLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <div className="new-spot-and-user-button-container">
      <div className="new-spot-link-container">
        <a className="new-spot-link" href="/spots/new">
          Create a New Spot
        </a>
      </div>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </div>
  ) : (
    <div className="login-signup-container">
      <li>
        <LoginSignupButton />
      </li>
    </div>
  );

  return (
    <ul className="nav-container">
      <li id="home-link-container">
        <div id="home-icon-container">
          <FcHome />
        </div>
        <NavLink to="/" id="home-link" className="link">
          VacayDnD
        </NavLink>
      </li>
      {isUserLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
