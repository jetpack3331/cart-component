import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getProducts,
    submitCart
} from '../../actions/cart';

import ProductList from '../ProductList/ProductList';
import Price from '../Price/Price';
import './Cart.scss';

class Cart extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    clalculateTotalPrice(products) {
        if (products.length === 0) {
            return {
                amount: 0,
                currency: 'USD'
            }
        }
        
        return {
            amount: products.reduce((sum, { price }) => sum + price.amount, 0),
            currency: products[0].price.currency // Take for now only the first currency. @TODO: multicurrency counter
        }
    }

    handleSubmit() {
        this.props.submitCart()
            .then(() => {
                alert('Cart submitted');
            });
    }

    render() {
        const {
            products,
            loading,
            error,
            submitCart
        } = this.props;

        const submittable = products.length > 0;

        return (
            <div className="container cart">
                <h2>
                    {submittable > 0 ? `Cart (${products.length})` : 'Cart is empty'}
                </h2>

                {loading && <div>Loading products...</div>}
                {/** @TODO: add reloading button */}
                {error && <div>Error with loading the products</div>}

                {submittable && <ProductList products={products} />}

                <div className="total d-flex-inline">
                    <div className="justify-content-start">
                        Total price: <Price {...this.clalculateTotalPrice(products)}  />
                    </div>
                    {submittable && <div className="justify-content-end">                        
                        <button disabled={!submittable} onClick={() => this.handleSubmit()} className="btn btn-success">Submit</button>
                    </div>}
                </div>
            </div>
        )
    }
}

Cart.propTypes = {
    getProducts: PropTypes.func.isRequired,
    submitCart: PropTypes.func.isRequired,
    products: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
};

const mapStateToProps = state => ({
    products: state.cart.data,
    loading: state.cart.loading,
    error: state.cart.error
});

const mapActionsToProps = {
    getProducts,
    submitCart
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);