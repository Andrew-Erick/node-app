var mongoose=require('mongoose');
var CounterSchema=new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    seq:{
      type:Number,
      default:0
    }
})
module.exports=CounterSchema;