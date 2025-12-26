import { reviewService } from "../../services/review.service.js"
import { SET_REVIEWS, SET_IS_LOADING, SET_FILTER_BY } from "../reducers/review.reducer.js"
import { store } from "../store.js"

export async function loadReviews() {
    const filterBy = store.getState().reviewModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const reviews = await reviewService.query(filterBy)
        store.dispatch({ type: SET_REVIEWS, reviews })
    } catch (err) {
        console.log('review action -> Cannot load reviews', err)
        throw err
    } finally {
        //* mimic server delay
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 100)
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
