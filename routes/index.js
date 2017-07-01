var express = require('express');
var router = express.Router();
var db = require('../model/db');
var Commodity = db.Commodity;

// 显示主页页面
router.get('/', (req, res)=>{
    var userName = req.session.userName || '';
    Commodity.find({is_trade: false}).then(function(data) {
        res.render('users/index', {user: userName, gooseList: data});
    }).catch(function(err) {
        console.log('错误信息为：' + err);
    });
});


// 商品详情页
router.get('/commodity_detail/:cid', (req, res)=>{
    var userName = req.session.userName || '';
    var cid = req.params.cid;
    Commodity.findById(cid).then(function(data) {
        res.render('users/detail', {user: userName, cInfo: data});
    })
});


// 导出路由子模块
module.exports = router;