import { userService } from "../../services/user.service.js"

// User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {

        case SET_USER:
            return {
                ...state,
                loggedinUser: cmd.user
            }
        case SET_USER_SCORE:
            return {
                ...state,
                loggedinUser: { ...state.loggedinUser, score: cmd.score }
            }
        default: return state
    }
}

