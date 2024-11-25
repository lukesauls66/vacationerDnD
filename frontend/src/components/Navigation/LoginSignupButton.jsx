import { useState } from "react";
import { GiDjinn } from "react-icons/gi";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

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
  const [isLoginSignupModal, setIsLoginSignupModal] = useState(false);

  const openAndCloseModal = () => {
    setIsLoginSignupModal(!isLoginSignupModal);
  };

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={openAndCloseModal}>
        <HamburgerIcon />
        <GiDjinn />
      </button>
      {isLoginSignupModal && (
        <div className="login-signup-modal">
          <div className="login-signup-modal-content">
            <button onClick={openAndCloseModal} className="close-modal-button">
              &times;
            </button>
            <div className="login-signup-modal-buttons">
              <div onClick={openAndCloseModal}>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div onClick={openAndCloseModal}>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginSignupButton;
