import './ProfileButton.css';

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdWaterDrop } from "react-icons/md";

import * as sessionActions from '../../store/session';

const WaterDrop = () => {
    return (
        <div style={{ color: '#74e1ff', fontSize:'50px', marginTop: '10px'}}>
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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (
        <div>
            <button onClick={toggleMenu}>
                <WaterDrop />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileButton;