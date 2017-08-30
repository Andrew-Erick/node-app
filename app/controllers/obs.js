var Obs=require('../models/obs');
var Project = require('../models/project');
var _ = require('underscore');
var URL=require('url');
var querystring=require('querystring');
// obslist page
exports.index=function(req,res){
  getProject(function(projects){ 
      res.render('obs/index',{projects:projects});
   })
}
// obs list page
exports.list=function(req,res){
  Obs.fetch(function(err,obs){
    if(err){
      console.log(err);
    }
     res.json(obs);
  })
}

// obs post
function getProject(next){
    Project.fetch(function(err, projects) {
        if (err) {
            console.log(err);
        }
        next(projects);
    })
}
exports.save=function(req,res){
  var id=req.body._id;
  var obsObj=req.body;
  var _obs;
  getLevel(obsObj.upper_obs,0,function(level){
    obsObj.level=level;
    if(typeof id!="undefined"){
      Obs.findById(id,function(err,obs){
        if(err){
          console.log(err)
        }
        _obs=_.extend(obs,obsObj);
        _obs.save(function(err,obs){
          if(err){
            console.log(err)
          }
          Obs.findById(obs._id,function(err,obs){
            if(err){
              console.log(err)
            }
            res.send(obs);
          })
        })
      })
    }else{
      _obs=new Obs(obsObj);
      _obs.save(function(err,obs){
        if(err){
          console.log(err)
        }
         Obs.findById(obs._id,function(err,obs){
              if(err){
                console.log(err)
              }
              res.send(obs);
            })
        })
    }
    
  })
  function getLevel(id,i,next){
    if(id==""||id==undefined||id==null){
      next(i);
    }else{
      Obs.findById(id,function(err,res){
        if(err){
          console.log(err);
        }
        if(res==""||res==undefined){
          next(i);
        }else{
          getLevel(res.upper_obs,++i,next);
        }    
      });
      
    }
  }
}
exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Obs.remove({_id:{$in:ids}},function(err,obs){
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
  Obs.findById(id,function(err,obs){
    if(err){
      console.log(err)
    }
    getProject(function(projects){
      res.render('obs/detail',{obs:obs,projects:projects})
    })
  })
}