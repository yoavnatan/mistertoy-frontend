import { httpService } from './http.service.js'

import Axios from 'axios'
import { store } from '../store/store.js'
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'review/'

export const reviewService = {
    query,
    saveReview,
    getDefaultFilter
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}


function saveReview(toyId, txt) {
    const review = {
        toyId,
        txt
    }
    return httpService.post(BASE_URL + toyId, review)
}

function getDefaultFilter() {

    return { txt: '' }

}