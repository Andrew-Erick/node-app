var Projectserver=require('../models/projectserver');
var Pbs=require('../models/pbs');
var Preview=require('../models/preview');
var Activity=require('../models/activity');
var Obsuser=require('../models/obsuser');
var Project = require('../models/project')
var Counter=require('../models/counter');
var _ = require('underscore');
var URL=require('url');
var querystring=require('querystring');
// projectserverlist page
exports.index=function(req,res){
  Pbs.fetch(function(err,pbs){
    if(err){
      console.log(err)
    }
    Preview.fetch(function(err,preview){
      if(err){
        console.log(err)
      }
      Obsuser.fetch(function(err,users){
        if(err){
        console.log(err)
        }
        getProject(function(projects){ 
          res.render('projectserver/index',{pbs:pbs,preview:preview,projects:projects,users:users});
       })
      })
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
  var arg=URL.parse(req.url).query;
  var id=querystring.parse(arg).id;
  var conditions=(id=="null"?{}:{project:id});
  Projectserver.fetch(conditions,function(err,projectserver){
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
    Counter.findOneAndUpdate({name:'projectserverId'},{$inc:{seq:1}},{new:true,upsert:true},function(err,counter){
      if(err){
        console.log(err);
      }
      _projectserver.id=counter.seq;
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
exports.export=function(req,res){
  var id=req.body.id;
  var pid=req.body.project;
  // 找到Pbs，然后找到根据Pbs的activity找出对于的级别，如果是飞机级则复制，如果不是则找过所有的子节点，然后post到projectServer里面，最后将project的状态改为已导入
  Pbs.findById(id,function(err,pbs){
    if(err){
      console.log(err)
    }
    var type=pbs.type;
    console.log("type",type);
    if(type==undefined){
      console.log("pbs activity undefined")
    }
    /**
     * if type==1 ,find all activity type field==1
     * if type=2,find all child nodes activity type field ==2
     */
    if(type==1){
      getActivities(pbs,type)
    }else if(type==2||type==3){
      getPbs(pbs,type)
    }else{
      console.log("type error"+type);
    }
    function getProjectserverObj(id,activity){
      var projectserverObj=new Object();
      projectserverObj.name=activity.activity;
      projectserverObj.description=activity.description;
      projectserverObj.input=activity.input;
      projectserverObj.output=activity.output;
      projectserverObj.task=activity.task;
      projectserverObj.preview=activity.stage;
      projectserverObj.tool=activity.tool;
      projectserverObj.method=activity.method;
      projectserverObj.pbs=id;
      projectserverObj.project=pid;
      return projectserverObj;
    }
    function exportProject(projectserverObj){
      var _projectserver=new Projectserver(projectserverObj);
      Counter.findOneAndUpdate({name:'projectserverId'},{$inc:{seq:1}},{new:true,upsert:true},function(err,counter){
        if(err){
          console.log(err);
        }
        _projectserver.id=counter.seq;
        _projectserver.save(function(err,projectserver){
          if(err){
            console.log(err)
          }
        })
      })
    }
    function getActivities(pbs,type){
      Activity
      .find({"type":type})
      .exec(function(err,activities){
        if(err){
          console.log(err)
        }
        for(var item in activities){
          var _projectserverObj=getProjectserverObj(pbs._id,activities[item]);
          _projectserverObj.name=pbs.name+_projectserverObj.name;
          exportProject(_projectserverObj);
        }
      })
    }
    
    function getPbs(pbs,type){
      getActivities(pbs,type)
      if(pbs._id!=null){
        Pbs.find({pid:pbs._id})
        .exec(function(err,pbsArray){
          console.log("pbsArray",pbsArray);
          if(err){
            console.log(err)
          }
          if(pbsArray.length>0){
            for(var item in pbsArray){
              getPbs(pbsArray[item],type);
            }
          }
        })
      }
    }
  })

}