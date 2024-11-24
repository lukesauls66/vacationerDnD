import './ProfileButton.css';
import * as sessionActions from '../../store/session';

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdWaterDrop } from "react-icons/md";

import OpenModalButton from './OpenModalButton'
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';


const WaterDrop = () => {
    return (
        <div style={{ color: 'rgb(95, 219, 250)', fontSize:'50px', marginTop: '10px'}}>
            <MdWaterDrop />
        </div>
    );
};

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
              setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (
        <div>
            <button onClick={toggleMenu}>
                <WaterDrop />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>

                    </>
                ) : (
                    <>
                        <li>
                            <OpenModalButton
                                buttonText='Log In'
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalButton
                                buttonText='Sign Up'
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default ProfileButton;