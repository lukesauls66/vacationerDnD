import { useState } from "react";
import { useDispatch } from "react-redux";
import { GiDjinn } from "react-icons/gi";
import * as sessionActions from "../../store/session/sessionSlice";

const HamburgerIcon = () => {
  return (
    <div className="hamburger-icon">
      <div className="line"></div>

      <div className="line"></div>

      <div className="line"></div>
    </div>
  );
};

function LoginSignupButton() {
  const [isDropdown, setIsDropdown] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={toggleDropdown}>
        <HamburgerIcon />
        <GiDjinn />
      </button>
      {isDropdown && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}
