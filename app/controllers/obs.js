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
  var arg=URL.parse(req.url).query;
  var oid=querystring.parse(arg).oid;
  var conditions=(oid=="null"?{}:{project:oid});
  Obs.fetch(conditions,function(err,obs){
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
    Obs.populate(obs,[{
      path:'pid',
      model:'Obs'
    }],function(err,obs){
      getProject(function(projects){
        res.render('obs/detail',{obs:obs,projects:projects})
      })

    });
  })
}