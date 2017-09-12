var Project=require('../models/project');
var Wbs=require('../models/wbs');
var Pbs=require('../models/pbs');
var Obs=require('../models/obs');
var _ = require('underscore');
var URL=require('url');
var querystring=require('querystring');
// projectlist page
exports.index=function(req,res){
  Wbs.fetch(function(err,wbs){
    if(err){
      console.log(err)
    }
    getProject(function(projects){ 
      res.render('project/index',{projects:projects,wbs:wbs});
    })

  }) 
}
// project list page
exports.list=function(req,res){
  Project.fetch(function(err,project){
    if(err){
      console.log(err);
    }
     res.json(project);
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
// project post

exports.save=function(req,res){
  var id=req.body._id;
  console.log("id",id);
  var projectObj=req.body;
  var _project;
  if(typeof id!="undefined"){
    Project.findById(id,function(err,project){
      if(err){
        console.log(err)
      }
      _project=_.extend(project,projectObj);
      _project.save(function(err,project){
        if(err){
          console.log(err)
        }
        Project.populate(project,{
          path:'wbs',
          model:'Wbs',
          populate:[{
            path:'upper_pbs',
            model:'Pbs'
          },{
            path:'upper_obs',
            model:'Obs'
          }]
          },
          function(err,pro){
          if(err){
            console.log(err)
          }
          res.send(pro);
        })
        
      })
    })
  }else{
    _project=new Project(projectObj);
    _project.save(function(err,project){
      if(err){
        console.log(err)
      }
      Project.populate(project,{
            path:'wbs',
            model:'Wbs',
            populate:[{
              path:'upper_pbs',
              model:'Pbs'
            },{
              path:'upper_obs',
              model:'Obs'
            }]
          },function(err,pro){
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
  console.log("ids",ids)
  if(ids!=null&&ids.length>0){
    Project.remove({_id:{$in:ids}},function(err,project){
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
exports.detail=function(req,res){
  var arg=URL.parse(req.url).query;
  var id=querystring.parse(arg).id;
  Project.findById(id,function(err,project){
    if(err){
      console.log(err)
    }
    var wbs=project.wbs==undefined?new Wbs():project.wbs;
    var pbs=wbs.upper_pbs==undefined?new Pbs():wbs.upper_pbs;
    var obs=wbs.upper_obs==undefined?new Obs():wbs.upper_obs;
    getProject(function(projects){
      res.render('project/detail',{project:project,projects:projects,wbs:wbs,pbs:pbs,obs:obs})
    })
  })
}