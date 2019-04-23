var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd');
var db = "1701BLemon";
var col_user = "user";
var col_bill = "bill";
var col_classify = "classify";
var col_icon = "icon";
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//登录
router.post('/api/user', function(req, res, next) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    Mongo.find(db, col_user, { "name": name, "pwd": pwd }, function(result) {
        if (!result) {
            res.json({
                code: 0,
                msg: "登录失败"
            })
        } else {
            res.json({
                code: 1,
                msg: "登录成功",
                data: result
            })
        }
    })
});
//个人账单信息
router.post('/api/bill', function(req, res, next) {
    let id = req.body.uid
    Mongo.find(db, col_bill, { "uid": id }, function(result) {
        if (!result) {
            res.json({
                code: 0,
                msg: "个人账单查询失败"
            })
        } else {
            res.json({
                code: 1,
                msg: "个人账单查询成功",
                data: result
            })
        }
    })
});
//删除账单
router.post('/api/delbill', function(req, res, next) {
    let delid = req.body.delid;
    Mongo.remove(db, col_bill, { "_id": delid }, function(result) {
        if (!result) {
            res.json({
                code: 0,
                msg: "个人账单删除失败"
            })
        } else {
            res.json({
                code: 1,
                msg: "个人账单删除成功",
                data: result
            })
        }
    })
});
//查询分类
router.post('/api/getClassify', function(req, res, next) {
    Mongo.remove(db, col_classify, {}, function(result) {
        if (!result) {
            res.json({
                code: 0,
                msg: "个人账单分类查询失败"
            })
        } else {
            res.json({
                code: 1,
                msg: "个人账单分类查询成功",
                data: result
            })
        }
    })
});



module.exports = router;