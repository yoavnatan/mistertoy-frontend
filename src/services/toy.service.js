
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { useSelector } from 'react-redux'

import Axios from 'axios'
import { store } from '../store/store.js'
const axios = Axios.create({
    withCredentials: true
})

// const BASE_URL = '/api/toy/'
// const BASE_URL = '//localhost:3030/api/toy/'


const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getRandomLabels,
    getToyLabels,
    getLabelsStats,
    getInventoryByLabel

}

const labels = [
    'Educational',
    'Battery Powered',
    'Outdoor',
    'Baby',
    'Plush',
    'Vehicle',
    'Building',
    'Board Game',
    'Fantasy',
    'Electronic'
]

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        vendor: '',
        price: '',
        speed: '',
    }
}

function getRandomToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(90, 200),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: '', labels: [] }
}


function getRandomLabels() {
    const toyLabels = [
        'Educational',
        'Battery Powered',
        'Outdoor',
        'Baby',
        'Plush',
        'Vehicle',
        'Building',
        'Board Game',
        'Fantasy',
        'Electronic'
    ]
    const labels = []
    for (let i = 0; i <= utilService.getRandomIntInclusive(1, 5); i++) {
        let currLabel = toyLabels[utilService.getRandomIntInclusive(0, toyLabels.length - 1)]
        while (labels.includes(currLabel)) {
            currLabel = toyLabels[utilService.getRandomIntInclusive(0, toyLabels.length - 1)]
        }
        labels.push(currLabel)
    }
    return labels
}

function getToyLabels() {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(labels)
        }, 100)
    )
}

function getLabelsStats() {
    return query()
        .then(toys => {
            const result = {}

            labels.forEach(label => {
                const filtered = toys.filter(toy => toy.labels.includes(label))

                if (filtered.length === 0) {
                    result[label] = null
                } else {
                    const avg = filtered.reduce((sum, toy) => sum + toy.price, 0) / filtered.length
                    result[label] = avg
                }
            })
            return result
        })
}

function getInventoryByLabel() {
    return query()
        .then(toys => {
            const result = {}

            labels.forEach(label => {
                result[label] = { inStock: 0, outOfStock: 0 }
            })

            toys.forEach(toy => {
                toy.labels.forEach(label => {
                    if (result[label]) {
                        if (toy.inStock) result[label].inStock++
                        else result[label].outOfStock++
                    }
                })
            })
            console.log(result)
            return result

        })

}