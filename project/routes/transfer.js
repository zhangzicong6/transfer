var express = require('express');
var router = express.Router();
var TransferModel = require('../model/Transfer.js');
var mem = require('../util/mem.js')

const asyncRedis = require("async-redis");
const redis_client = asyncRedis.createClient();

router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    statics(req,res)

    mem.get('transfer_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            var links = []
            if(value.type==1){
                for (var i = 0; i < value.links.length; i++) {
                    var link = value.links[i];
                    var weight =10;
                    if(value.weights.length>i){
                        weight = value.weights[i]
                    }
                    for (var j = 0; j < weight; j++) {
                        links.push(link)
                    }
                }
            }else{
                links = value.links
            }
            var link = links[parseInt(Math.random()*links.length)]
            link= getLink(req,value,link)
            res.redirect(link)
        }else {
            TransferModel.find({id: id}, function (err, data) {
                if (data && data[0]&& data[0].links) {
                    var value = data[0];
                    mem.set('transfer_' + req.params.id, JSON.stringify(value), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    var links = []
                    if(value.type==1){
                        for (var i = 0; i < value.links.length; i++) {
                            var link = value.links[i];
                            var weight =10;
                            if(value.weights.length>i){
                                weight = value.weights[i]
                            }
                            for (var j = 0; j < weight; j++) {
                                links.push(link)
                            }
                        }
                    }else{
                        links = value.links
                    }
                    
                    //console.log('----lixin----', link)
                    var link = links[parseInt(Math.random()*links.length)]
                    link= getLink(req,value,link)
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

function statics(req,res){
    var id = req.params.id;
    var material = req.query.material;
    if(!material){
        return
    }
    let uid = req.cookies['transfer_novel_b'];
    if(!uid){
        uid = randomWord(false,32)
        res.cookie(
            'transfer_novel_b',uid,{
                path:'/',       // 写cookie所在的路径
                maxAge: 100*12*30*24*60*60*1000,   // cookie有效时长
                expires:new Date(Date.now()+100*12*30*24*60*60*1000), // cookie失效时间
                httpOnly:false,  // 是否只用于http请求中获取
                overwrite:false  // 是否允许重写
            }
        );
    }


    redis_client.incr('qiyue_website_transfer_pv_'+id+'_'+material).then(function(){})
    redis_client.pfadd('qiyue_website_transfer_uv_'+id+'_'+material , uid).then(function(){})
    redis_client.pfadd('qiyue_website_transfer_ip_'+id+'_'+material , getClientIp(req)).then(function(){})
    
    //统计
    

}

let getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
}

function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}


function getLink(req,value,link){
    if(value.back_urls&&value.back_urls.length){
        let back = req.protocol+'://'+req.hostname+'/transfer/back/'+value.id+'?index=0'
        back = encodeURIComponent(back)
        if(link.indexOf('?')!=-1){
            link+='&back='+back
        }else{
            link+='?back='+back
        }
    }
    return link
}

router.get('/back/:id', function (req, res, next) {
    let id = req.params.id;
    let index = parseInt(req.query.index);
    mem.get('transfer_' + id).then(function (value) {
        if(value){
            value = JSON.parse(value)
            if(value.back_urls&&value.back_urls.length){
                let link = value.back_urls[index];
                if(value.back_urls.length>index+1){
                    let back = req.protocol+'://'+req.hostname+'/transfer/back/'+value.id+'?index='+(index+1)
                    back = encodeURIComponent(back)
                    if(link.indexOf('?')!=-1){
                        link+='&back='+back
                    }else{
                        link+='?back='+back
                    }
                }else{
                    if(link.indexOf('?')!=-1){
                        link+='&history='+value.back_urls.length
                    }else{
                        link+='?history='+value.back_urls.length
                    }
                }
                console.log(link)
                res.redirect(link)
            }else{
                res.send('没有返回链接')
            }
        }else {
            TransferModel.find({id: id}, function (err, data) {
                if (data && data[0]&& data[0].links) {
                    var value = data[0];
                    mem.set('transfer_' + req.params.id, JSON.stringify(value), 1*60).then(function () {
                        //console.log('---------set transfer value---------')
                    })
                    
                    if(value.back_urls&&value.back_urls.length){
                        let link = value.back_urls[index];
                        if(value.back_urls.length>index+1){
                            let back = req.protocol+'://'+req.hostname+'/transfer/back/'+value.id+'?index='+(index+1)
                            back = encodeURIComponent(back)
                            if(link.indexOf('?')!=-1){
                                link+='&back='+back
                            }else{
                                link+='?back='+back
                            }
                        }else{
                            if(link.indexOf('?')!=-1){
                                link+='&history='+value.back_urls.length
                            }else{
                                link+='?history='+value.back_urls.length
                            }
                        }
                        console.log(link)
                        res.redirect(link)
                    }else{
                        res.send('没有返回链接')
                    }
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
