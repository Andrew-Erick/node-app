var Projectserver=require('../models/projectserver');
var Pbs=require('../models/pbs');
var Project = require('../models/project')
var _ = require('underscore');

// projectserverlist page
exports.index=function(req,res){
  Pbs.fetch(function(err,pbs){
    if(err){
      console.log(err)
    }
    getProject(function(projects){ 
      res.render('projectserver/index',{pbs:pbs,projects:projects});
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
// projectserver list page
exports.list=function(req,res){
  Projectserver.fetch(function(err,projectserver){
    if(err){
      console.log(err);
    }
     res.json(projectserver);
  })
}

// projectserver post

exports.save=function(req,res){
  var id=req.body._id;
  var projectserverObj=req.body;
  var _projectserver;
  if(typeof id!="undefined"){
    Projectserver.findById(id,function(err,projectserver){
      if(err){
        console.log(err)
      }
      _projectserver=_.extend(projectserver,projectserverObj);
      _projectserver.save(function(err,projectserver){
        if(err){
          console.log(err)
        }
        Projectserver.findById(projectserver._id,function(err,projectserver){
          if(err){
            console.log(err)
          }
          res.send(projectserver);
        })
      })
    })
  }else{
    _projectserver=new Projectserver(projectserverObj);
    _projectserver.save(function(err,projectserver){
      if(err){
        console.log(err)
      }
       Projectserver.findById(projectserver._id,function(err,projectserver){
            if(err){
              console.log(err)
            }
            res.send(projectserver);
          })
      })
  }
}
exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Projectserver.remove({_id:{$in:ids}},function(err,projectserver){
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