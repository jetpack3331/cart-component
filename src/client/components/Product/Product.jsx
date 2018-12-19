import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    changeQuantity,
    removeProduct
} from '../../actions/cart';

import {
    Button
} from 'reactstrap';
import Price from '../Price/Price';
import './Product.scss';

class Product extends Component {
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
            removeProduct,
            changeQuantity
        } = this.props;

        return (
            <tr className="product">
                <td>
                    <img src={image} alt={name} />
                </td>
                <td>
                    {name}
                </td>
                <td>
                    <dl>
                        {Object.keys(attributes).map((name) => [
                            <dt>{name}</dt>,
                            <dd>{attributes[name]}</dd>
                        ])}
                    </dl>                    
                </td>
                <td>
                    <Price {...pricePerUnit} />
                </td>
                <td>
                    <input min={1} onChange={e => changeQuantity(id, parseInt(e.target.value))} type="number" value={quantity} />
                </td>
                <td>
                    <Price className="price" {...price} />    
                </td>
                <td>
                    <Button size="small" className="remove-btn" color="danger" onClick={() => removeProduct(id)}>Remove</Button>
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