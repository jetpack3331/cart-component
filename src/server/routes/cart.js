import express from 'express';

const router = express.Router();

router
    .route('/cart/products')
    .get(() => {
        return [
            {
                id: 1,
                product: 'product-1',
                quantity: 2,
                price: {
                    currency: 'USD',
                    amount: 100
                }
            }
        ]
    })

export default router;