var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ActivitySchema=new mongoose.Schema({
    id:Number,
    level:Number,
    upper_activity:String,
    activity_number:Number,
    activity:String,
    activity_description:String,
    type:Number,
    input:String,
    output:String,
    task:String,
    executor:String,
    stage:{
      type:ObjectId,
      ref:'Preview'
    },
    tool:String,
    method:String,
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

ActivitySchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next();
});

ActivitySchema.statics={
  fetch:function(cb){
    return this
        .find({})
        .sort('meta.updateAt')
        .populate('stage')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
          .findOne({
              _id: id
          })
          .populate('stage')
          .exec(cb)
  }
}
module.exports=ActivitySchema;