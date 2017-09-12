
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var WbsSchema=new mongoose.Schema({
    id:Number,
    pid:{
      type:ObjectId,
      ref:'Wbs',
      default:null
    },
    level:Number,
    number:String,
    name:String,
    level:Number,
    upper_obs:{
      type:ObjectId,
      ref:'Obs'
    },
    upper_pbs:{
      type:ObjectId,
      ref:'Pbs'
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

WbsSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  if(this.level==null||this.level==""){
    console.log("this.level",this.level);
    this.level=1;
  }
  next();
});

WbsSchema.statics={
  fetch:function(cb){
    return this
        .find({})
        .sort('meta.updateAt')
        .populate('upper_obs')
        .populate('upper_pbs')
        .exec(cb)
  },
  findById:function(id,cb){
    return this
      .findOne({
          _id: id
      })
      .populate('upper_obs')
      .populate('upper_pbs')
      .exec(cb)
  }
}
module.exports=WbsSchema;
