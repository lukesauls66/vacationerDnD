import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { FcHome } from "react-icons/fc";
import "./Navigation.css";

function Navigation({ isUserLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <div className="login-signup-container">
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </div>
  );

  return (
    <ul className="nav-container">
      <li id="home-link-container">
        <div id="home-icon-container">
          <FcHome />
        </div>
        <NavLink to="/" id="home-link" className={"link"}>
          VacayDnD
        </NavLink>
      </li>
      {isUserLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
