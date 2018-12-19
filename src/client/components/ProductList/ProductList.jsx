import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    clearAll
} from '../../actions/cart';
import Product from '../Product/Product';
import './ProductList.scss';

class ProductList extends Component {
    handleClearAll() {
        if (window.confirm('Really clear all products?')) {
            this.props.clearAll();
        }
    }

    render() {
        const {
            products,
            clearAll
        } = this.props;

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
                            <td>
                                <button onClick={() => this.handleClearAll()} className="btn btn-small btn-danger">Clear</button>
                            </td>
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

const mapActionsToProps = {
    clearAll
};

export default connect(undefined, mapActionsToProps)(ProductList);