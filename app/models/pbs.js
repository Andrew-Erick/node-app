var mongoose=require('mongoose');
var PbsSchema=require('../schemas/pbs');
var Pbs=mongoose.model('Pbs',PbsSchema);

module.exports=Pbs