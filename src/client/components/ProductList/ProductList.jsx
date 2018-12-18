import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Product from '../Product/Product';

import './ProductList.scss';

class ProductList extends Component {
    render() {
        const { products } = this.props;

        return (
            <React.Fragment>
                {products.map(product => <Product key={`product-${product.id}`} {...product} />)}
            </React.Fragment>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.array
};

ProductList.defaultProps = {
    products: []
};

export default connect()(ProductList);