import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

import Axios from 'axios'
import { store } from '../store/store.js'
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}


async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) return _setLoggedinUser(user)
    else throw new Error('Invalid login')

}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname }

    const savedUser = await httpService.post(BASE_URL + 'signup', user)
    if (savedUser) return _setLoggedinUser(user)
    else return Promise.reject('Invalid signup')

}


async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}


function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    return httpService.put('user/', { diff })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}



function getById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



