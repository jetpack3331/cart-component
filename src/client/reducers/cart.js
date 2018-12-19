import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    CHANGE_QUANTITY,
    REMOVE_PRODUCT,
    CLEAR_ALL
} from '../constants/cart';

const initialState = {
    data: [], // contains cart products
    error: null, // any error during ajax requests
    loading: false // detect loading state
};

export default function cart(state = initialState, action = {}) {
    switch(action.type) {
        case GET_PRODUCTS_START:
            return {
                ...state,
                loading: true
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: initialState.loading,
                data: action.data,
                error: initialState.error
            };
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                loading: initialState.loading,
                error: action.error
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                data: state.data.filter(p => p.id !== action.id)
            };
        case CHANGE_QUANTITY:
            return {
                ...state,
                data: state.data.map(p => {
                    if (p.id !== action.id) {
                        return p;
                    }
                    
                    return {
                        ...p,
                        quantity: action.quantity,
                        price: {
                            ...p.price,
                            amount: p.pricePerUnit.amount * action.quantity
                        }
                    }
                })
            };
        case CLEAR_ALL:
            return {
                ...state,
                data: initialState.data
            }
        default:
            return state;
    }
}