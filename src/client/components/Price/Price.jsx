import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Price.scss';

class Price extends PureComponent {
    format(amount, currency) {
        return amount.toLocaleString('en-US', { style: 'currency', currency });
    }
    render() {
        const {
            currency,
            amount,
            className
        } = this.props;

        return (
            <span className={`price ${className}`}>
                {this.format(amount, currency)}
            </span>
        )
    }
}

Price.propTypes = {
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
};

export default Price;