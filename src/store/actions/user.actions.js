import { authService } from "../../services/auth.service.js"
import { userService } from "../../services/user.service.js"
// import { CLEAR_CART, TOGGLE_CART_IS_SHOWN } from "../reducers/car.reducer.js"
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js"
import { store } from "../store.js"


export async function login(credentials) {

    try {
        const loggedinUser = await authService.login(credentials)
        store.dispatch({ type: SET_USER, user: loggedinUser })
    } catch (err) {
        console.log('user action -> Cannot login', err)
        throw err
    }
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, user: loggedinUser })
        })
        .catch(err => {
            console.log('user action -> Cannot signup', err)
            throw err
        })
}

export async function logout() {
    await authService.logout()
    try {
        store.dispatch({ type: SET_USER, user: null })

    } catch (err) {
        console.log('user action -> Cannot logout', err)
        throw err
    }
}

export function checkout(diff) {
    return userService.updateScore(diff)
        .then((newScore) => {
            store.dispatch({ type: SET_USER_SCORE, score: newScore })
            store.dispatch({ type: CLEAR_CART })
            store.dispatch({ type: TOGGLE_CART_IS_SHOWN })
        })
        .catch(err => {
            console.log('user action -> Cannot logout', err)
            throw err
        })
}