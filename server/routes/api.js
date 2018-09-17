const express = require('express');
const router = express.Router();

// MySql Db connection and set in globally
global.conn = require('../settings/db');

// All controllers
const buildingsCtrl = require('../controllers/buildingsCtrl');
const roomsCtrl = require('../controllers/roomsCtrl');
const tenantsCtrl = require('../controllers/tenantsCtrl');

router.use('/buildings', buildingsCtrl);

router.use('/rooms', roomsCtrl);

router.use('/tenants', tenantsCtrl);

router.get('/', (req, res) => {
    res.status(200).json({'message': 'API works'});
});

module.exports = router;