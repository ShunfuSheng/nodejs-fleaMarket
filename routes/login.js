var express = require('express');
var router = express.Router();
var db = require('../model/db');
// 引入数据模型
var Student = db.Student;


// 登录页面展示
router.get('/login', (req, res)=>{
    res.render('login/login');
});


// 用户登录处理
router.post('/login', (req, res)=>{
    var user_name = req.body.user_name;
    var user_pwd = req.body.user_pwd;
    Student.findOne({account: user_name, pwd: user_pwd}).then(function(data){
        if(data) {
            // 存储用户数据
            req.session.userId = data.id;
            req.session.userName = data.name;
            res.json({status: 200, msg: '登录成功，准备跳转'});
        }else {
            res.json({status: 400, msg: '账号或密码错误，请重新输入'});
        }
    }).catch(function(err){
        console.log('错误信息为：' + err);
    });
});


// 用户登出处理
router.get('/logout', (req, res)=>{
    req.session.userId = null;
    req.session.userName = null;
    res.redirect('/');
});


// 注册页面展示
router.get('/register', (req, res)=>{
    res.render('login/register');
});


// 用户注册处理
router.post('/register', (req, res)=>{
    var userInfo = req.body;
    delete userInfo.rePWD;
    var account = req.body.account;
    Student.findOne({account: account}).then(function(data){
        if(data) {
            res.json({status: 400, msg: '该用户已存在，请重新注册...'});
        }else {
            Student.create(userInfo).then(function(){
                res.json({status: 200, msg: '注册成功!'});
            });
        }
    }).catch(function(err){
        console.log('错误信息为：' + err);
    });
});




// 导出路由子模块
module.exports = router;