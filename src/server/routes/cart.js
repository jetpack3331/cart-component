const express = require('express');
const HttpStatus = require('http-status');
const faker = require('faker');

const router = express.Router();

// Mocked database. Live only in memory.
// @TODO: connect to the real DB ^_^
const db = {
    products: []
};

// Use faker to generate the faked data

for (let i = 0; i < 5; i++) {
    const priceInUSD = parseFloat(faker.commerce.price(.10,5.00,2));

    db.products.push({
        name: faker.commerce.productName(),
        quantity: i + 1,
        price: {
            currency: 'USD',
            amount: (i + 1) * priceInUSD
        },
        pricePerUnit: {
            currency: 'USD',
            amount: priceInUSD
        },
        attributes: {
            color: faker.commerce.color(),
            material: faker.commerce.productMaterial()
        },
        id: faker.random.uuid(),
        image: faker.image.food(),
        description: faker.lorem.sentence()
    });
}

router
    .route('/cart/products')
    .get((req, res) => {
        return res.json(db.products);
    });

// Moved to the client

// router
//     .route('/cart/remove-product')
//     .get((req, res) => {
//         const { id } = req.query;

//         if (!db.products.find(p => p.id !== id)) {
//             // Should send message that product isn't in the DB
//             return res.sendStatus(HttpStatus.BAD_REQUEST);
//         }

//         db.products = db.products.filter(p => p.id !== id);

//         return res.json(db.products);
//     });

// @TODO: route for validating the available quantity of the product.
// Quantity can change in time working in the cart

router
    .route('/cart/submit')
    .post((req, res) => {
        if (db.products.length === 0) {
            // Should send message that cart is empty
            return res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        // @TODO: Submit somewhere the cart data
        // Just return the content of the cart
        return res.json(req.body);
    });

module.exports = router;