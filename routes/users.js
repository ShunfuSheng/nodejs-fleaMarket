var express = require('express');
var router = express.Router();
var db = require('../model/db');
// 引入数据模型
var Student = db.Student;
var Commodity = db.Commodity;
var StudentCommodity = db.StudentCommodity;
var Trade = db.Trade;

//配置文件上传
var multer = require('multer');
//通过 filename 属性定制
var storage = multer.diskStorage({
    destination: './public/images/',
    filename: function (req, file, cb) {
        //设置保存文件名
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({storage: storage});


// 商品发布页面
router.get('/issue', (req, res)=>{
    var userName = req.session.userName || '';
    res.render('users/issue', {user: userName});
});


// 商品发布处理
router.post('/issue', upload.single('preview'), (req, res)=>{
    var uid = req.session.userId;
    var issueDate = new Date();
    var gooseInfo = req.body;
    gooseInfo.image = req.file.filename;
    Commodity.create(gooseInfo).then(function(data) {
        var cid = data._id;
        StudentCommodity.create({sid: uid, cid: cid, issueDate: issueDate}).then(function(){
            res.json({status: 200, msg: '商品发布成功'});
        });
    }).catch(function(err) {
        console.log('错误信息为：' + err);
    });
});


// 商品购买
router.post('/trade', (req, res)=>{
    var bid = req.session.userId;
    var cid = req.body.cid;
    var tradeDate = new Date();
    Commodity.findByIdAndUpdate(cid, {is_trade: true}).then(function(data) {
        Trade.create({bid: bid, cid: cid, tradeDate: tradeDate}).then(function() {
            res.json({status: 200, msg: '购买成功！'});
        });
    }).catch(function(err) {
        console.log('错误信息为：' + err);
    });
});


// 交易记录
router.get('/history', (req, res)=> {
    var userName = req.session.userName || '';
    var uid = req.session.userId;
    Trade.find({bid: uid}).populate('cid').then(function(cData) {
        res.render('users/history', {user: userName, purchaseList: cData});
    })
})


// 导出路由子模块
module.exports = router;