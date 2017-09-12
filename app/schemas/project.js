var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ProjectSchema=new mongoose.Schema({
    id:Number,
    name:String,
    background:String,
    rules:String,
    wbs:{
      type:ObjectId,
      ref:'Wbs'
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

ProjectSchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt=this.meta.updateAt=Date.now();
  }else{
    this.meta.updateAt=Date.now();
  }
  next();
});

ProjectSchema.statics={
  fetch:function(cb){
    return this
        .find({})
        .sort('meta.updateAt')
        .populate({
          path:'wbs',
          model:'Wbs',
          populate:[{
              path:'upper_pbs',
              model:'Pbs',
              populate:[{
                path:'activity',
                model:'Activity'
              }]
            },{
              path:'upper_obs',
              model:'Obs'
            }]
        })
        .exec(cb)
  },
  findById:function(id,cb){
    return this
          .findOne({
              _id: id
          })
          .populate({
            path:'wbs',
            model:'Wbs',
            populate:[{
              path:'upper_pbs',
              model:'Pbs',
              populate:[{
                path:'activity',
                model:'Activity'
              }]
            },{
              path:'upper_obs',
              model:'Obs'
            }]
          })
          .exec(cb)
  }
}
module.exports=ProjectSchema;