const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {

    var buildingId = req.params.id;
    
    var sql = "Select * from rooms where building_id = '" + buildingId + "'";
    conn.query(sql, (err, roomsData) => {
        try{
            if(err) throw new Error(err);
            res.status(200).json({'auth': true, 'data': roomsData});
        } catch(err){
            res.status(401).json({'auth': false, 'error': err.message});
        }
    });
});

module.exports = router;