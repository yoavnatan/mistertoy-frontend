import { toyService } from "../../services/toy.service.js"
// * TOYS
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_TOY_LENGTH = 'SET_TOY_LENGTH'
export const TOY_UNDO = 'TOY_UNDO'


//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isLoading: false,
    shoppingCart: [],
    isCartShown: false,
    filterBy: toyService.getDefaultFilter(),
    toysLength: null
}

export function toyReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys }

        case REMOVE_TOY:
            const lasttoys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lasttoys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }
        case SET_TOY_LENGTH:
            console.log(cmd.maxPage)
            return {
                ...state,
                toysLength: cmd.maxPage
            }

        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }

        case ADD_CAR_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.car]
            }

        case REMOVE_CAR_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(car => car._id !== action.carId)
            return { ...state, shoppingCart }


        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

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
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lasttoys]
            }

        default:
            return state
    }
}