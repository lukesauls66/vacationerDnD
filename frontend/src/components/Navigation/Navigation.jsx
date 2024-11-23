import './Navigation.css';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const sessionLinks = sessionUser ? (
        <li>
            <ProfileButton user={sessionUser} />
        </li>
    ) : (
        <div className='navlink-container'>
            <li>
                <NavLink to='/login'>Log In</NavLink>
            </li>
            <li>
                <NavLink to='/signup'>Sign Up</NavLink>
            </li>
        </div>
    );

    return (
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;