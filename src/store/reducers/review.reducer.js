import { reviewService } from "../../services/review.service.js"

export const SET_REVIEWS = 'SET_REVIEWS'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    reviews: [],
    isLoading: false,
    filterBy: reviewService.getDefaultFilter(),

}

export function reviewReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_REVIEWS:
            return {
                ...state,
                reviews: cmd.reviews
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        default:
            return state
    }
}