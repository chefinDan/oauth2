'use strict'

const express = require('express');
const router = express.Router();
const { json } = require('body-parser');
const jsonParser = json({ type: 'application/json' });

// router.post('/boats',
//     jsonParser,
//     boatController.validate('createBoat'),
//     boatController.createBoat
// );

// router.get('/boats',
//     boatController.validate('listBoats'),
//     boatController.listBoats
// );

router.use((err, req, res, next) => {
    console.error(err);
    if (err.status < 500)
        res.status(err.status).json(err)
    else
        res.status(500).json({ 'status': 500, 'details': 'Internal Server Error' });
});

module.exports = router;