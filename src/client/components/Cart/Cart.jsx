import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts } from '../../actions/cart';

import ProductList from '../ProductList/ProductList';
import './Cart.scss';

class Cart extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { products } = this.props;

        return (
            <React.Fragment>
                <div>Cart component</div>
                <ProductList products={products} />
            </React.Fragment>
        )
    }
}

Cart.propTypes = {
    getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    products: state.cart.data
});

const mapActionsToProps = {
    getProducts
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);