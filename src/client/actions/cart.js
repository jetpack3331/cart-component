import axios from 'axios';

import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    REMOVE_PRODUCT
} from '../constants/cart';

const API_URL = 'http://localhost/api/cart';

export function getProducts() {
    return (dispatch) => {
        dispatch({
            type: GET_PRODUCTS_START
        })

        return axios.get(`${API_URL}/products`)
            .then(products => {
                return dispatch({
                    type: GET_PRODUCTS_SUCCESS,
                    data: products.data
                })
            })
            .catch(error => {
                return dispatch({
                    type: GET_PRODUCTS_ERROR,
                    error
                })
            })
    }
}

export function decreaseQuantity(id) {
    return {
        type: DECREASE_QUANTITY,
        id
    }
}

export function increaseQuantity(id) {
    return {
        type: INCREASE_QUANTITY,
        id
    }
}

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}