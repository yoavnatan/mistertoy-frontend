import { httpService } from './http.service'

import Axios from 'axios'
import { store } from '../store/store.js'
const axios = Axios.create({
    withCredentials: true
})

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'auth/'

export const authService = {
    login,
    signup,
    logout,
    getLoggedinUser
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
    else throw new Error('Invalid login')
}

function signup({ username, password, fullname }) {
    return httpService.post(BASE_URL + 'signup', { username, password, fullname })
        .then(res => res.data)
        .then(_setLoggedinUser)
}

async function logout() {
    const res = await httpService.post(BASE_URL + 'logout')
    console.log(res)
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}
