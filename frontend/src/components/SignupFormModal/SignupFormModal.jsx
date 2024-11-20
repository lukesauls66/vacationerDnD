import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session/sessionSlice";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (sessionUser) {
    return <Navigate to="/" replace={true} />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-form-container">
      <div className="inner-signup-form-container">
        <h1>Sign Up</h1>
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
          {errors.username && <p>{errors.username}</p>}
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
          {errors.firstName && <p>{errors.firstName}</p>}
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
          {errors.lastName && <p>{errors.lastName}</p>}
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
          {errors.email && <p>{errors.email}</p>}
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
          {errors.password && <p>{errors.password}</p>}
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
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
