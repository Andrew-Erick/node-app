var mongoose=require('mongoose');
var ObsSchema=require('../schemas/obs');
var Obs=mongoose.model('Obs',ObsSchema);

module.exports=Obs