var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ObsSchema=new mongoose.Schema({
    id:Number,
    number:String,
    name:String,
    level:Number,
    pid:{
      type:ObjectId,
      ref:'Activity',
      default:null
    },
    project:{
      type:ObjectId,
      ref:'Project'
    },
    type:Number,
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

ObsSchema.pre('save',function(next){
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

ObsSchema.statics={
  fetch:function(conditions,cb){
    return this
        .find(conditions)
        .sort('meta.updateAt')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
          .findOne({
              _id: id
          })
          .exec(cb)
  }
}
module.exports=ObsSchema;