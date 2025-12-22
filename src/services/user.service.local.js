import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    const users = await storageService.query(STORAGE_KEY)

    const user = users.find(user => user.username === username)
    // if (user && user.password !== password) return _setLoggedinUser(user)
    if (user) return _setLoggedinUser(user)
    else throw new Error('Invalid login')

}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    const savedUser = await storageService.post(STORAGE_KEY, user)
    _setLoggedinUser(savedUser)
}


async function updateScore(diff) {
    const loggedInUserId = getLoggedinUser()._id
    const user = await userService.getById(loggedInUserId)

    if (user.score + diff < 0) return Promise.reject('No credit')
    user.score += diff
    const savedUser = await storageService.put(STORAGE_KEY, user)
    _setLoggedinUser(savedUser)
    return savedUser.score

}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
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



