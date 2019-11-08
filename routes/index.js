'use strict'

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const { json } = require('body-parser');
const jsonParser = json({ type: 'application/json' });

// router.post('/boats',
//     jsonParser,
//     boatController.validate('createBoat'),
//     boatController.createBoat
// );

router.get('/auth',
    authController.authorize,
);
router.get('/auth/redirect',
    authController.redirect
)

router.get('/people',
    authController.authenticate,
)

router.use((err, req, res, next) => {
    console.error(err);
    if (err.status < 500)
        res.status(err.status).json(err)
    else
        res.status(500).json({ 'status': 500, 'details': 'Internal Server Error', 'dump': err});
});

module.exports = router;