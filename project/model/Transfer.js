var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var TransferSchema = new Schema({
  id:String,
  title:String,
  links: Array
});

var TransferModel = db.model('Transfer', TransferSchema);

module.exports = TransferModel;