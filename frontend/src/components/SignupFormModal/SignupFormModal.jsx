import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session/sessionSlice";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (!errors) {
      dispatch(sessionActions.resetErrors());
    }
  }, [dispatch, errors]);

  const validationErrors = ({ username, firstName, lastName, email }) => {
    const newValidationErrors = {};

    if (username.length < 4) {
      newValidationErrors.username = "Username must be at least 4 characters";
    }
    if (!firstName || firstName[0] !== firstName[0].toUpperCase()) {
      newValidationErrors.firstName = "First name must be capitalized";
    }
    if (!lastName || lastName[0] !== lastName[0].toUpperCase()) {
      newValidationErrors.lastName = "Last name must be capitalized";
    }
    if (!email.includes("@")) {
      newValidationErrors.email = "Email must be a valid email";
    }

    return newValidationErrors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Confirm Password must be the same as the Password";
    }

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const clientSideErrors = validateForm();

    if (Object.keys(clientSideErrors).length > 0) {
      setErrors(clientSideErrors);
      return;
    }

    try {
      setErrors({});

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
        setErrors(validationErrors(res.meta.arg));
        return;
      }

      closeModal();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  console.log(errors);

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
          {errors.username && (
            <p
              className="user-signup-errors
          "
            >
              {errors.username}
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
          {errors.firstName && (
            <p
              className="user-signup-errors
          "
            >
              {errors.firstName}
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
          {errors.lastName && (
            <p
              className="user-signup-errors
          "
            >
              {errors.lastName}
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
          {errors.email && (
            <p
              className="user-signup-errors
          "
            >
              {errors.email}
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
          {errors.password && (
            <p
              className="user-signup-errors
          "
            >
              {errors.password}
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
          {errors.confirmPassword && (
            <p
              className="user-signup-errors
          "
            >
              {errors.confirmPassword}
            </p>
          )}
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
