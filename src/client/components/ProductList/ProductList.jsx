import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Product from '../Product/Product';
import './ProductList.scss';

class ProductList extends Component {
    render() {
        const { products } = this.props;

        return (
            <div className="row">
                <table className="table table-hovered">
                    <thead>
                        <tr className="unstylled">
                            <td></td>
                            <td>Name</td>
                            <td>Attributes</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => <Product key={`product-${product.id}`} {...product} />)}
                    </tbody>
                </table>
            </div>
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