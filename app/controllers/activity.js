var Activity=require('../models/activity');
var Preview=require('../models/preview');
var Project = require('../models/project')
var _ = require('underscore');

// activitylist page
exports.index=function(req,res){
  getProject(function(projects){
    Preview.fetch(function(err,previews){
      if(err){
        console.log(err);
      }
      res.render('activity/index',{previews:previews,projects:projects})
      
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

// activity list page
exports.list=function(req,res){
  Activity.fetch(function(err,activity){
    if(err){
      console.log(err);
    }
     res.json(activity);
  })
}

// activity post

exports.save=function(req,res){
  var id=req.body._id;
  var activityObj=req.body;
  var _activity;
  if(typeof id!="undefined"){
    Activity.findById(id,function(err,activity){
      if(err){
        console.log(err)
      }
      _activity=_.extend(activity,activityObj);
      _activity.save(function(err,activity){
        if(err){
          console.log(err)
        }
        Activity.findById(activity._id,function(err,activity){
          if(err){
            console.log(err)
          }
          res.send(activity);
        })
      })
    })
  }else{
    _activity=new Activity(activityObj);
    _activity.save(function(err,activity){
      if(err){
        console.log(err)
      }
       Activity.findById(activity._id,function(err,activity){
            if(err){
              console.log(err)
            }
            res.send(activity);
          })
      })
  }

}

exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Activity.remove({_id:{$in:ids}},function(err,activity){
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