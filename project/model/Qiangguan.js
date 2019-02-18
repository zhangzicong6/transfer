var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var QiangguanSchema = new Schema({
  id:Number,
  jumpLink: String,
  wechatId: String,
  baseStr : String,
  strLink : String
});

var QiangguanModel = db.model('Qiangguan', QiangguanSchema);
module.exports = QiangguanModel;