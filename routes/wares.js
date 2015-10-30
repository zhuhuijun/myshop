var express = require('express');
var router = express.Router();
var Ware = require('../models').Ware;
var Cart = require('../models').Cart;
var path = require('path');
router.get('/list', function (req, res, next) {
    Ware.find({}).exec(function (err, list) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(list);
        }
    });
});
/***
 * 添加
 */
router.post('/add', function (req, res, next) {
    var ware = req.body;
    new Ware(ware).save(function (err, reone) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(reone);
        }
    });
});
/**
 * 添加购物车
 */
router.get('/addcart/:_id', function (req, res, next) {
    var cart = {num: 1};
    cart.ware = req.params._id;
    console.log(cart);
    cart.user = req.session.user._id;
    new Cart(cart).save(function (err, reone) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(reone);
        }
    });
});
module.exports = router;
