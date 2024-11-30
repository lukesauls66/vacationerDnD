import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/slices/sessionSlice";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.session.errors);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    if (!errors) {
      dispatch(sessionActions.resetErrors());
    }
  }, [dispatch, errors]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    dispatch(sessionActions.resetErrors());

    try {
      const res = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (res.type.endsWith("/rejected")) {
        return;
      }

      closeModal();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const signInDemoUser = () => {
    setCredential("demouser");
    setPassword("password6");
  };

  return (
    <div className="login-form-container">
      <div className="inner-login-form-container">
        <div className="form-h1-container">
          <h1 id="login-form-h1">Log In</h1>
        </div>
        <form className="login-form" onSubmit={onSubmit}>
          <label className="credential-label">
            Username or Email:
            <input
              className="login-input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className="login-password-label">
            Password:
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {submitAttempted && errors && (
            <p className="credential-error">
              {errors.credential || errors.password || "Invalid credentials"}
            </p>
          )}
          <button className="login-button" type="submit">
            Log In
          </button>
          <button
            className="demo-login-button login-button"
            onClick={signInDemoUser}
            type="submit"
          >
            Demo User (Not a Rickroll)
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
