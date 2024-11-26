import './LoginForm.css';
import * as sessionActions from '../../store/session';

import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';


function LoginFormModal() {
    const dispatch = useDispatch();
    
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({
                credential, password 
            })).then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
            }
        });
    };

    return (
        <div id='login-container'>

            <div id='login-form'>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username or Email
                        <input
                            type='text'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errors.credential && <p>{errors.credential}</p>}
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginFormModal;