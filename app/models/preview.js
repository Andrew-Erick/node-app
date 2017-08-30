var mongoose=require('mongoose');
var PreviewSchema=require('../schemas/preview');
var Preview=mongoose.model('Preview',PreviewSchema);

module.exports=Preview