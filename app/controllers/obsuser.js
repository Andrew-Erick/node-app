var Obsuser=require('../models/obsuser');
var Obs=require('../models/obs');
var Project = require('../models/project')
var _ = require('underscore');
var URL=require('url');
var querystring=require('querystring');
// obsuserlist page
exports.index=function(req,res){
  Obs.fetch(function(err,obs){
    if(err){
      console.log(err);
    }
    getProject(function(projects){
      res.render('obsuser/index',{obs:obs,projects:projects});

    })
  })
}
// obsuser list page
exports.list=function(req,res){
  Obsuser.fetch(function(err,obsuser){
    if(err){
      console.log(err);
    }
     res.json(obsuser);
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
// obsuser post

exports.save=function(req,res){
  var id=req.body._id;
  var obsuserObj=req.body;
  var _obsuser;
  if(typeof id!="undefined"){
    Obsuser.findById(id,function(err,obsuser){
      if(err){
        console.log(err)
      }
      _obsuser=_.extend(obsuser,obsuserObj);
      _obsuser.save(function(err,obsuser){
        if(err){
          console.log(err)
        }
        Obsuser.findById(obsuser._id,function(err,obsuser){
          if(err){
            console.log(err)
          }
          res.send(obsuser);
        })
      })
    })
  }else{
    _obsuser=new Obsuser(obsuserObj);
    _obsuser.save(function(err,obsuser){
      if(err){
        console.log(err)
      }
       Obsuser.findById(obsuser._id,function(err,obsuser){
            if(err){
              console.log(err)
            }
            res.send(obsuser);
          })
      })
  }
}
exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Obsuser.remove({_id:{$in:ids}},function(err,obsuser){
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
  Obsuser.findById(id,function(err,obsuser){
    if(err){
      console.log(err)
    }
    Obsuser.populate(obsuser,[{
      path:'upper_obs',
      model:'Obs'
    }],function(err,obsuser){
      getProject(function(projects){
        res.render('obsuser/detail',{obsuser:obsuser,projects:projects})
      })

    });
  })
}