var mongoose=require('mongoose');
var ObsuserSchema=require('../schemas/obsuser');
var Obsuser=mongoose.model('Obsuser',ObsuserSchema);

module.exports=Obsuser