import axios from 'axios';

import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    CHANGE_QUANTITY,
    REMOVE_PRODUCT,
    CLEAR_ALL,
    SUBMIT,
    SUBMIT_SUCCESS,
    SUBMIT_ERROR
} from '../constants/cart';

const API_URL = process.env.API_URL || 'http://localhost/api/cart';

export function getProducts() {
    return (dispatch) => {
        dispatch({
            type: GET_PRODUCTS_START
        })

        return axios.get(`${API_URL}/products`)
            .then(products => {
                // setTimeout(() => {
                //     return dispatch({
                //         type: GET_PRODUCTS_SUCCESS,
                //         data: products.data
                //     })
                // }, 1500);
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

export function changeQuantity(id, quantity) {
    return {
        type: CHANGE_QUANTITY,
        id,
        quantity
    }
}

export function removeProduct(id) {
    return {
        type: REMOVE_PRODUCT,
        id
    }
}

export function clearAll() {
    return {
        type: CLEAR_ALL
    };
}

export function submitCart() {
    return (dispatch, getState) => {
        dispatch({
            type: SUBMIT
        })

        const products = getState().cart.data;

        return axios.post(`${API_URL}/submit`, products.map(p => ({
            id: p.id,
            quantity: p.quantity
        })))
            .then(() => {
                dispatch({
                    type: SUBMIT_SUCCESS
                });
                return dispatch(clearAll());
            })
            .catch(error => {
                return dispatch({
                    type: SUBMIT_ERROR,
                    error
                });
            })
    }
}