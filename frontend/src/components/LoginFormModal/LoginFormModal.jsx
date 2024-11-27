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

    const isValid = () => credential.length >= 4 && password.length >= 6;

    const demoUser = {
        credential: 'demo@example.com',
        password: 'password123'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (isValid()) {
            return dispatch(sessionActions.login({
                credential, password 
            })).then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
        } else {
            setErrors({
                credential: credential.length < 4 ? 'Username or Email must be as least 4 characters' : '',
                password: password.length < 6 ? 'Password must be at least 6 characters' : '',
            })
        }

    };

    const handleDemoLogin = () => {
        setErrors({});
        return dispatch(sessionActions.login(demoUser))
            .then(closeModal)
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
                    {errors.password && <p>{errors.password}</p>}
                    <button type='submit' disabled={!isValid()}>Log In</button>
                    <a 
                        href='#'
                        className='demo-user'
                        onClick={handleDemoLogin}
                    >
                        Demo User
                    </a>
                </form>
            </div>
        </div>
    );
}

export default LoginFormModal;




// import './LoginForm.css';
// import * as sessionActions from '../../store/session';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux'
// import { useModal } from '../../context/Modal';


// function LoginFormModal() {
//     const dispatch = useDispatch();
    
//     const [credential, setCredential] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const { closeModal } = useModal();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors({});
//         return dispatch(sessionActions.login({
//                 credential, password 
//             })).then(closeModal)
//             .catch(async (res) => {
//                 const data = await res.json();
//                 if (data && data.errors) {
//                     setErrors(data.errors);
//             }
//         });
//     };

//     return (
//         <div id='login-container'>

//             <div id='login-form'>
//                 <h1>Log In</h1>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Username or Email
//                         <input
//                             type='text'
//                             value={credential}
//                             onChange={(e) => setCredential(e.target.value)}
//                             required
//                         />
//                     </label>
//                     <label>
//                         Password
//                         <input
//                             type='password'
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </label>
//                     {errors.credential && <p>{errors.credential}</p>}
//                     <button type='submit'>Log In</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default LoginFormModal;