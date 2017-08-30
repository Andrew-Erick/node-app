var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ProjectserverSchema=new mongoose.Schema({
    id:String,  
    name:String,  
    description:String, 
    pbs:String, 
    input:String, 
    output:String,  
    requirement:String, 
    stage:{
      type:ObjectId,
      ref:'Preview'
    }, 
    tools:String, 
    method:String,        
    resource:String,  
    plan_start_time:Date, 
    plan_end_time:Date, 
    start_time:Date,  
    end_time:Date,
    meta:{
      createAt:{
        type:Date,
        default:Date.now()
      },
      updateAt:{
        type:Date,
        default:Date.now()
      }
    }
});

ProjectserverSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next();
});

ProjectserverSchema.statics={
  fetch:function(cb){
    return this
        .find({})
        .sort('meta.updateAt')
        .populate('upper_projectserver')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
          .findOne({
              _id: id
          })
          .populate('upper_projectserver')
          .exec(cb)
  }
}
module.exports=ProjectserverSchema;