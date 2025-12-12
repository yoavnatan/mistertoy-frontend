import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="main-header flex align-center space-between">

            <Link to="/"><div className='logo'>TOYS</div></Link>
            <ul className="main-nav flex clean-list">
                <NavLink to="/about" className="link flex align-center">About</NavLink>
                <NavLink to="/" className="link flex align-center">Toys</NavLink>
                <NavLink to="/dashboard" className="link flex align-center">Dashboard</NavLink>
            </ul>
        </header>
    )

}