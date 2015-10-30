var express = require('express');
var router = express.Router();
var Cart = require('../models').Cart;
var path = require('path');
router.get('/list', function (req, res, next) {
    Cart.find({}).populate('ware').exec(function (err, list) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(list);
        }
    });
});
module.exports = router;
