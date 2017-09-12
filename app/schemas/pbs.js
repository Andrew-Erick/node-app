var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var PbsSchema=new mongoose.Schema({
    id:Number,
    number:String,
    name:String,
    ata:String,
    level:Number,
    pid:{
      type:ObjectId,
      ref:'Pbs',
      default:null
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

PbsSchema.pre('save',function(next){
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

PbsSchema.statics={
  fetch:function(cb){
    return this
        .find({})
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
module.exports=PbsSchema;