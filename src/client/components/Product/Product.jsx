import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Product extends PureComponent {
    render() {
        const {
            name,
            id,
            attributes,
            price
        } = this.props;

        return (
            <div>
                Name: {name}
            </div>
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
    })
};

export default Product;