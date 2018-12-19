import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    changeQuantity,
    removeProduct
} from '../../actions/cart';

import Price from '../Price/Price';
import './Product.scss';

class Product extends Component {
    handleChangeQuantity(event) {
        const value = parseInt(event.target.value);
        this.props.changeQuantity(this.props.id, isNaN(value) ? '' : value);
    }

    render() {
        const {
            name,
            id,
            attributes,
            price,
            pricePerUnit,
            description,
            image,
            quantity,
            removeProduct
        } = this.props;

        return (
            <tr className="product">
                <td>
                    <img src={image} alt={name} />
                </td>
                <td>
                    {name}
                    <br />
                    <span className="text-muted">{description}</span>
                </td>
                <td>
                    <dl>
                        {Object.keys(attributes).map((name, key) => [
                            <dt key={`product-attr-name-${name}`}>{name}</dt>,
                            <dd key={`product-attr-val-${key}`}>{attributes[name]}</dd>
                        ])}
                    </dl>                    
                </td>
                <td>
                    <Price {...pricePerUnit} />
                </td>
                <td>
                    <input
                        min={1}
                        type="number"
                        onChange={e => this.handleChangeQuantity(e)}
                        value={quantity}
                    />
                </td>
                <td>
                    <Price className="price" {...price} />    
                </td>
                <td>
                    <button
                        size="small"
                        className="remove-btn btn btn-danger"
                        onClick={() => removeProduct(id)}>
                        Remove
                    </button>
                </td>
            </tr>
        )
    }
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    price: PropTypes.shape({
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    }),
    pricePerUnit: PropTypes.shape({
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    }),
    changeQuantity: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired
};

const mapActionsToProps = {
    changeQuantity,
    removeProduct
};

export default connect(undefined, mapActionsToProps)(Product);