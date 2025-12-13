import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export function AppHeader() {

    return (
        <header className="main-header full flex align-center space-between">

            <Link to="/"><div className='logo'>TOYS</div></Link>
            <ul className="main-nav flex clean-list">
                <NavLink to="/about" className="link flex align-center"> <i class="fa-solid fa-circle-info"></i>About</NavLink>
                <NavLink to="/" className="link flex align-center"><i class="fa-solid fa-gamepad"></i>Toys</NavLink>
                <NavLink to="/dashboard" className="link flex align-center"><i class="fa-solid fa-chart-line"></i> Dashboard</NavLink>
            </ul>
        </header>
    )

}