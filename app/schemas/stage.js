var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var StageSchema=new mongoose.Schema({
    id:Number,
    name:String,
    stage_description:String,
    output:String,
    preview_in:{
      type:ObjectId,
      ref:'Preview'
    },
    preview_out:{
      type:ObjectId,
      ref:'Preview'
    },
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

StageSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next();
});

StageSchema.statics={
  fetch:function(cb){
    return this
        .find({})
        .sort('meta.updateAt')
        .populate('preview_in')
        .populate('preview_out')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
        .findOne({
            _id: id
        })
        .populate('preview_in')
        .populate('preview_out')
        .exec(cb)
  }
}
module.exports=StageSchema;