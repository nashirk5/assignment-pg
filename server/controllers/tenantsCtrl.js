const express = require('express');
const router = express.Router();

// Get all tenants details
router.get('/', (req, res) => {

    var sql = 'SELECT t.*, b.building_name, r.room_no FROM tenants AS t JOIN buildings AS b ON t.building_id = b.id JOIN rooms r ON t.room_id = r.id ORDER BY t.id ASC';
    conn.query(sql, (err, tenantsData) => {
        try{
            if(err) throw new Error(err);
            res.status(200).json({'auth': true, 'data': tenantsData});
        } catch(err){
            res.status(401).json({'auth': false, 'error': err.message});
        }
    });
});

// Insert a tenants details
router.post('/', (req, res) => {

    var newTenants = req.body;
    var sql = "INSERT INTO tenants (name, pan_no, aadhar_no, building_id, room_id) VALUES ('"+newTenants.name+"', '"+newTenants.pan_no+"', '"+newTenants.aadhar_no+"', '"+newTenants.building_id+"', '"+newTenants.room_id+"')";
    conn.query(sql, (err, data) => {
        try{
            if(err) throw new Error(err);
            res.status(200).json({'auth': true, 'data': data});
        } catch(err){
            res.status(401).json({'auth': false, 'error': err.message});
        }
    });
});

// Update a tenants details
router.put('/:id', (req, res) => {

    var id = req.params.id;
    var newTenants = req.body;
    var sql = "UPDATE tenants SET name = '"+newTenants.name+"', pan_no = '"+newTenants.pan_no+"', aadhar_no = '"+newTenants.aadhar_no+"', building_id = '"+newTenants.building_id+"', room_id = '"+newTenants.room_id+"' WHERE id = '"+id+"'";
    conn.query(sql, (err, data) => {
        try{
            if(err) throw new Error(err);
            res.status(200).json({'auth': true, 'data': data});
        } catch(err){
            res.status(401).json({'auth': false, 'error': err.message});
        }
    });
});

// Delte a tenants details
router.delete('/:id', (req, res) => {

    var id = req.params.id;
    var sql = "DELETE FROM tenants WHERE id = '"+id+"'";
    conn.query(sql, (err, data) => {
        try{
            if(err) throw new Error(err);
            res.status(200).json({'auth': true, 'data': data});
        } catch(err){
            res.status(401).json({'auth': false, 'error': err.message});
        }
    });
});

module.exports = router;