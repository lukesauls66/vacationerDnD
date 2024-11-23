import './ProfileButton.css';

import { useState } from 'react';
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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className='profile-button-container'>
            <button aria-label='User Profile'>
                <WaterDrop />
            </button>
            <ul className='profile-dropdown'>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li>
                    <button className='logout-button' onClick={logout}>Log Out</button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileButton;