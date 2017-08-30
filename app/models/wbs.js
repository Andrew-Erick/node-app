var mongoose=require('mongoose');
var WbsSchema=require('../schemas/wbs');
var Wbs=mongoose.model('Wbs',WbsSchema);

module.exports=Wbs