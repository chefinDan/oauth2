'use strict'

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const peopleController = require('../controller/peopleController');
const { json } = require('body-parser');
const jsonParser = json({ type: 'application/json' });

router.use('/people', 
    authController.check,
    peopleController.getInfo
);

router.get('/', (req, res, next) => {
    res.redirect('/people')
})

router.get('/auth/redirect',
    authController.redirect
)

router.use((err, req, res, next) => {
    console.error(err);
    if (err.status < 500)
        res.status(err.status).json(err)
    else
        res.status(500).json({ 'status': 500, 'details': 'Internal Server Error', 'dump': err});
});

module.exports = router;