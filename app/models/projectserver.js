var mongoose=require('mongoose');
var ProjectserverSchema=require('../schemas/projectserver');
var Projectserver=mongoose.model('Projectserver',ProjectserverSchema);

module.exports=Projectserver