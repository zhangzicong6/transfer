var express = require('express');
var router = express.Router();
var TransferModel = require('../model/Transfer.js');
var mem = require('../util/mem.js')

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    mem.get('transfer_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            var link = value.links[Math.floor(Math.random() * value.links.length)]
            //console.log('----li----', link)
            res.redirect(link)
        }else {
            TransferModel.find({id: id}, function (err, data) {
                if (data && data[0]) {
                    var link = data[0].links[Math.floor(Math.random() * data[0].links.length)]
                    mem.set('transfer_' + req.params.id, JSON.stringify(data[0]), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    //console.log('----lixin----', link)
                    res.redirect(link)
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
