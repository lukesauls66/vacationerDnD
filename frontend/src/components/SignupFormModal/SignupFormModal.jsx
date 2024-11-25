import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/slices/sessionSlice";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const backendErrors = useSelector((state) => state.session.errors);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  console.log("Backend:", backendErrors);

  const validationErrors = ({ firstName, lastName }) => {
    const newValidationErrors = {};

    if (!firstName || firstName[0] !== firstName[0].toUpperCase()) {
      newValidationErrors.firstName = "First name must be capitalized";
    }
    if (!lastName || lastName[0] !== lastName[0].toUpperCase()) {
      newValidationErrors.lastName = "Last name must be capitalized";
    }

    return newValidationErrors;
  };

  const validateForm = ({ password, confirmPassword }) => {
    const newErrors = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Confirm Password must be the same as the Password";
    }

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const clientSideErrors = validationErrors({
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    const passwordConfirmation = validateForm({ password, confirmPassword });

    if (
      Object.keys(clientSideErrors).length > 0 ||
      Object.keys(passwordConfirmation).length > 0
    ) {
      setErrors({
        clientSideErrors,
        passwordConfirmation,
      });
    }

    try {
      const res = await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );

      if (res.type.endsWith("/rejected")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          backendErrors: res.payload,
        }));
        return;
      }

      closeModal();
    } catch (err) {
      console.error("Error:", err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: "An unexpected error occurred.",
      }));
    }
  };

  console.log("frontside:", errors);

  return (
    <div className="signup-form-container">
      <div className="inner-signup-form-container">
        <div className="form-h1-container">
          <h1 id="form-h1">Sign Up</h1>
        </div>
        <form className="signup-form" onSubmit={onSubmit}>
          <label className="username-label">
            Username:
            <input
              className="signup-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.backendErrors?.username && (
            <p className="user-signup-errors">
              {errors.backendErrors.username}
            </p>
          )}
          {errors.clientSideErrors?.username && (
            <p className="user-signup-errors">
              {errors.clientSideErrors.username}
            </p>
          )}
          <label className="firstname-label">
            First Name:
            <input
              className="signup-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.clientSideErrors?.firstName && (
            <p
              className="user-signup-errors
          "
            >
              {errors.clientSideErrors.firstName}
            </p>
          )}
          <label className="lastname-label">
            Last Name:
            <input
              className="signup-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.clientSideErrors?.lastName && (
            <p
              className="user-signup-errors
          "
            >
              {errors.clientSideErrors.lastName}
            </p>
          )}
          <label className="email-label">
            Email:
            <input
              className="signup-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.backendErrors?.email && (
            <p
              className="user-signup-errors
          "
            >
              {errors.backendErrors.email}
            </p>
          )}
          <label className="signup-password-label">
            Password:
            <input
              className="signup-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.backendErrors?.password && (
            <p
              className="user-signup-errors
          "
            >
              {errors.backendErrors.password}
            </p>
          )}
          <label className="confirm-password-label">
            Confirm Password:
            <input
              className="signup-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.passwordConfirmation?.confirmPassword && (
            <p
              className="user-signup-errors
          "
            >
              {errors.passwordConfirmation.confirmPassword}
            </p>
          )}
          {/* {errors.backendErrors?.signupError && (
            <p>{errors.backendErrors.signupError}</p>
          )} */}
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
