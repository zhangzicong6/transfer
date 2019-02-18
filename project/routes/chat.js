var express = require('express');
var router = express.Router();
var QiangguanModel = require('../model/Qiangguan.js');
var mem = require('../util/mem.js')

router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    mem.get('wechat_sub_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            res.render('chat',value)
        }else {
            QiangguanModel.find({id: id}, function (err, data) {
                if (data && data[0]) {
                    mem.set('wechat_sub_' + req.params.id, JSON.stringify(data[0]), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    res.render('chat',data[0])
                }else{
                    res.send('没有查询到此链接，请先创建')
                }
            })
        }
    }).catch(function (err) {
        console.log(err);
    });
})

module.exports = router;
