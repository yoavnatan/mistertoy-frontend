
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomLabels
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            // if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            toys = toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
                // toy.speed >= filterBy.minSpeed
            )
            if (filterBy.inStock) {
                toys = toys.filter(toys => JSON.stringify(toys.inStock) === filterBy.inStock)
            }
            console.log('labels :', filterBy.labels)
            if (filterBy.labels.length > 0) {
                toys = toys.filter(toy => filterBy.labels.some(label => toy?.labels?.includes(label)))
            }

            if (filterBy.sort) {
                if (filterBy.sort === 'name') {
                    toys = toys.sort((a, b) => a.name.localeCompare(b.name));
                } else if (filterBy.sort === 'createdAt') {
                    toys = toys.sort((a, b) => a.createdAt - b.createdAt);
                } else if (filterBy.sort === 'price') {
                    toys = toys.sort((a, b) => a.price - b.price);
                }
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: '',
        imgUrl: '',
    }
}

function _createToy() {
    const id = utilService.makeId()
    const toy = getEmptyToy()
    toy._id = id
    toy.inStock = true
    toy.name = getRandomToyName()
    toy.imgUrl = `https://robohash.org/${id}`
    toy.labels = getRandomLabels()
    toy.price = utilService.getRandomIntInclusive(50, 1000)
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            toys.push(_createToy())
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: '', labels: [] }
}


function getRandomToyName() {
    const toyNames = [
        'Talking Doll',
        'RC Turbo Toy',
        'Mega Blocks Set',
        'Plush Dragon',
        'Space Robot X5',
        'Magic Kit Junior',
        'Electric Train Set',
        'Bouncing Bunny',
        'Soccer Ball Kids',
        'Puzzle 1000 Pieces',
        'Water Gun XL',
        'Giant Teddy Bear',
        'Pirate Ship Playset',
        'Dinosaur Roar Rex',
        'Lego Space Explorer',
        'Wooden Farm Set',
        'Princess Castle Set',
        'Superhero Action Figure',
        'Mini Drone Kids',
        'Glow Stick Kit',
        'Marble Run Deluxe',
        'Baby Rattle Duo',
        'Stacking Rings Set',
        'Toy Kitchen Mini',
        'Doctor Kit Pro',
        'Tool Set Junior',
        'Firetruck Rescue',
        'Police Toy Siren',
        'Rainbow Unicorn Plush',
        'Robot Dog Buddy',
        'Foam Dart Blaster',
        'Puzzle Animals 50',
        'Musical Piano Toy',
        'Building Bricks Pack',
        'Jungle Safari Set',
        'Barrel of Monkeys',
        'Bubble Maker Machine',
        'Dance Mat Light-Up',
        'Rocking Horse Classic',
        'Baby Soft Blocks',
        'Monster Truck Crusher',
        'Yo-Yo Speedster',
        'Magic Wand Sparkle',
        'Slime Lab Kit',
        'Science Experiment Box',
        'Board Game Strategy',
        'Toyd Game Kids',
        'Rubber Duck Family',
        'Mini Basketball Hoop',
        'Beach Toy Bucket Set',
        'Ninja Sword Foam',
        'Knight Armor Set',
        'Fairy Garden Kit',
        'Race Track Loop',
        '3D Puzzle Tower',
        'Art & Craft Box',
        'Kinetic Sand Pack',
        'Alphabet Learning Pad',
        'Musical Drum Baby',
        'Stuffed Fox Plush',
        'Camping Tent Kids',
        'Trampoline Mini',
        'Ballet Doll',
        'Shark Attack Game',
        'Robot Builder Kit',
        'Fidget Spinner Pro',
        'Teddy Bear Classic',
        'Magic Snow Powder',
        'RC Helicopter Mini',
        'Foam Airplane Glider',
        'Laser Tag Blasters',
        'Dinosaur Egg Surprise',
        'Princess Styling Head',
        'Glow Stars Pack',
        'Walkie Talkie Kids',
        'Fire Station Set',
        'Paw Patrol Truck',
        'Super Toy Racer',
        'Electric Drum Pad',
        'Baby Play Gym',
        'Soft Bear Nightlight',
        'Light Saber Toy',
        'Dragon Castle Playset',
        'Giant Bubble Wand',
        'Sticker Book Mega',
        'Toy Cash Register',
        'Play Food Set',
        'Space Shuttle Model',
        'Wooden Train Set',
        'Police Station Blocks',
        'Safari Animal Figures',
        'Giraffe Plush Large',
        'Toy Vacuum Cleaner',
        'Mini Guitar Toy',
        'Doll Stroller Pink',
        'Racing Boat Remote',
        'Treasure Hunt Kit',
        'Volcano Science Kit'
    ]

    return toyNames[utilService.getRandomIntInclusive(0, toyNames.length - 1)]
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
