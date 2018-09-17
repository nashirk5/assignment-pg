const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    var sql = "select * from buildings";
    conn.query(sql, (err, buildingData) => {
        try{
            if(err) throw new Error(err);
            res.status(200).json({'auth': true, 'data': buildingData});
        } catch(err) {
            res.status(401).json({'auth': false, 'error': err.message});
        }
    });
});

module.exports = router;