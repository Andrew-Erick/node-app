var Stage=require('../models/stage');
var Preview=require('../models/preview');
var Project = require('../models/project')
var _ = require('underscore');

// stagelist page
exports.index=function(req,res){
  Preview.fetch(function(err,previews){
    if(err){
      console.log(err);
    }
    getProject(function(projects){
      res.render('stage/index',{previews:previews,projects:projects})   
    })
  })
}
function getProject(next){
    Project.fetch(function(err, projects) {
        if (err) {
            console.log(err);
        }
        next(projects);
    })
}
//
// stage list page
exports.list=function(req,res){
  Stage.fetch(function(err,stage){
    if(err){
      console.log(err);
    }
     res.json(stage);
  })
}

// stage post

exports.save=function(req,res){
  var id=req.body._id;
  var stageObj=req.body;
  var _stage;
  if(typeof id!="undefined"){
    Stage.findById(id,function(err,stage){
      if(err){
        console.log(err)
      }
      _stage=_.extend(stage,stageObj);
      _stage.save(function(err,stage){
        if(err){
          console.log(err)
        }
          Stage.populate(stage,[{
          path:'preview_in',
          model:'Preview',
        },{
          path:'preview_out',
          model:'Preview',
        }],function(err,pro){
          if(err){
            console.log(err)
          }
          res.send(pro);
        })
      })
    })
  }else{
    _stage=new Stage(stageObj);
    console.log(stageObj)
    _stage.save(function(err,stage){
      if(err){
        console.log(err)
      }
      Stage.populate(stage,[{
        path:'preview_in',
        model:'Preview',
      },{
        path:'preview_out',
        model:'Preview',
      }],function(err,pro){
        if(err){
          console.log(err)
        }
        res.send(pro);
      })
    })
  }
}

exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Stage.remove({_id:{$in:ids}},function(err,stage){
      if(err){
        console.log(err)
      }else{
        res.json({
          success:1
        })
      }
    })
  }
}