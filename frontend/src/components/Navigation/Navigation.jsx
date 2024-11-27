import './Navigation.css';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineWaterDrop } from "react-icons/md";

import ProfileButton from './ProfileButton';

const WaterDrop = () => {
    return (
        <div style={{ color: 'white', fontSize:'50px', marginTop: '10px'}}>
            <MdOutlineWaterDrop />
        </div>
    );
};

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <ul>
            <li>
                <NavLink to='/' className='home-btn'>
                    <span className='home-container'><WaterDrop /> WaterBnB</span>
                </NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;