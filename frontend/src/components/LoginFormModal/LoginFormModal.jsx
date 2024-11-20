import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session/sessionSlice";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-form-container">
      <div className="inner-login-form-container">
        <h1>Log In</h1>
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
          {errors.credential && <p>{errors.credential}</p>}
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
