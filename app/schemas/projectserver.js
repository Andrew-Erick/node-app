var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ProjectserverSchema=new mongoose.Schema({
    id:String,  
    name:String,  
    description:String, 
    pid:{
      type:ObjectId,
      ref:'Projectserver',
      default:null
    },
    level:Number,
    // child:[{
    //   type:ObjectId,
    //   ref:'Projectserver'
    // }],
    pbs:{
      type:ObjectId,
      ref:'Pbs'
    }, 
    input:String, 
    output:String,  
    task:String, 
    preview:{
      type:ObjectId,
      ref:'Preview'
    }, 
    tool:String, 
    method:String,        
    resource:{
      type:ObjectId,
      ref:'Obsuser'
    },       
    project:{
      type:ObjectId,
      ref:'Project'
    },  
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
  if(this.level==null){
    this.level=1;
  }
  next();
});

ProjectserverSchema.statics={
  fetch:function(conditions,cb){
    return this
        .find(conditions)
        .sort('meta.updateAt')
        .populate('pbs')
        .populate('preview')
        .populate('pid')
        .populate('child')
        .populate('resource')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
          .findOne({
              _id: id
          })
          .populate('upper_projectserver')
          .populate('pbs')
          .populate('preview')
          .populate('pid')
          .populate('child')
          .populate('resource')
          .exec(cb)
  }
}
module.exports=ProjectserverSchema;