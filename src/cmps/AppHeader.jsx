import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { authService } from '../services/auth.service'
import { showErrorMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'


export function AppHeader() {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onLogout() {
        await logout().catch(err => {
            console.log(err)
            showErrorMsg(`Couldn't logout`)
        })
    }

    return (
        <header className="main-header full flex align-center space-between">

            <Link to="/"><div className='logo'>TOYS</div></Link>
            {loggedinUser ? (
                < section >
                    Hello <Link to={`/user/${loggedinUser._id}`}>{loggedinUser.fullname} </Link>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <NavLink to="/auth"> login </NavLink>
                </section>
            )}
            <ul className="main-nav flex clean-list">
                <NavLink to="/about" className="link flex align-center"> <i className="fa-solid fa-circle-info"></i>About</NavLink>
                <NavLink to="/" className="link flex align-center"><i className="fa-solid fa-gamepad"></i>Toys</NavLink>
                <NavLink to="/dashboard" className="link flex align-center"><i className="fa-solid fa-chart-line"></i> Dashboard</NavLink>
            </ul>
        </header>
    )

}