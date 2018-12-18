import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    REMOVE_PRODUCT
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
                products: state.data.filter(p => p.id !== action.id)
            };
        case INCREASE_QUANTITY:
            return {
                ...state,
                data: state.data.map(p => {
                    if (p.id !== action.id) {
                        return p;
                    }
                    
                    // Increase new quantity of product
                    const newQuantity = p.quantity++;
                    return {
                        ...p,
                        quantity: newQuantity,
                        price: {
                            ...p.price,
                            amount: p.pricePerUnit.price * newQuantity
                        }
                    }
                })
            };
        case DECREASE_QUANTITY:
            return {
                ...state,
                data: state.data.map(p => {
                    if (p.id !== action.id) {
                        return p;
                    }
                    
                    // Decrease new quantity of product
                    // Check if product can be decreased is done in the component.
                    // So not needed here
                    // In case: p.quantity < 1 ? 1 : p.quantity--
                    const newQuantity = p.quantity--;
                    return {
                        ...p,
                        quantity: newQuantity,
                        price: {
                            ...p.price,
                            amount: p.pricePerUnit.price * newQuantity
                        }
                    }
                })
            }
        default:
            return state;
    }
}