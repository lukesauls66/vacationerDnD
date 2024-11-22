import { useState } from "react";
import { useDispatch } from "react-redux";
import { GiDjinn } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
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

function ProfileButton({ user }) {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
  };

  const openAndCloseModal = () => {
    setIsProfileModal(!isProfileModal);
  };

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={openAndCloseModal}>
        <HamburgerIcon />
        <GiDjinn />
      </button>
      {isProfileModal && (
        <>
          <div id="profile-modal-back" onClick={openAndCloseModal} />
          <div className="profile-modal">
            <div className="profile-modal-content">
              <button
                onClick={openAndCloseModal}
                className="close-modal-button"
              >
                &times;
              </button>
              <div className="profile-info">
                <p className="profile-user-info">Hello, {user.username}</p>
                <p className="profile-user-info">
                  {user.firstName} {user.lastName}
                </p>
                <p className="profile-user-info">{user.email}</p>

                <button onClick={logout} id="logout-button">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileButton;
