import React from 'react'
import PropTypes from 'prop-types'
import UserItem from '../users/UserItem';
import { Link } from 'react-router-dom';

//deconstructing from prop object
const Navbar = ({icon, title}) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>

        </nav>
    )

}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

// we can use defaultProps if the developer do not send props
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
}

//some basic validation of datatypes of properties being used in the expression down under h1
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}


export default Navbar
