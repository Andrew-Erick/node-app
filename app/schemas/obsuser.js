var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ObsuserSchema=new mongoose.Schema({
    id:Number,
    name:String,
    role:String,
    contract:String,
    upper_obs:{
      type:ObjectId,
      ref:'Obs'
    },
    project:{
      type:ObjectId,
      ref:'Project'
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

ObsuserSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next();
});

ObsuserSchema.statics={
  fetch:function(conditions,cb){
    return this
        .find(conditions)
        .sort('meta.updateAt')
        .populate('upper_obs')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
          .findOne({
              _id: id
          })
          .populate('upper_obs')
          .exec(cb)
  }
}
module.exports=ObsuserSchema;