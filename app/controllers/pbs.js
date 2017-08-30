var Pbs=require('../models/pbs');
var Project = require('../models/project');
var _ = require('underscore');
var URL=require('url');
var querystring=require('querystring');
// pbslist page
exports.index=function(req,res){
  getProject(function(projects){ 
    res.render('pbs/index',{projects:projects});
  })
}
// pbs list page
exports.list=function(req,res){
  Pbs.fetch(function(err,pbs){
    if(err){
      console.log(err);
    }
     res.json(pbs);
  })
}

// pbs post
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
  var pbsObj=req.body;
  var _pbs;
  getLevel(pbsObj.upper_pbs,0,function(level){
    pbsObj.level=level;
    if(typeof id!="undefined"){
      Pbs.findById(id,function(err,pbs){
        if(err){
          console.log(err)
        }
        _pbs=_.extend(pbs,pbsObj);
        _pbs.save(function(err,pbs){
          if(err){
            console.log(err)
          }
          Pbs.findById(pbs._id,function(err,pbs){
            if(err){
              console.log(err)
            }
            res.send(pbs);
          })
        })
      })
    }else{
      _pbs=new Pbs(pbsObj);
      _pbs.save(function(err,pbs){
        if(err){
          console.log(err)
        }
         Pbs.findById(pbs._id,function(err,pbs){
              if(err){
                console.log(err)
              }
              res.send(pbs);
            })
        })
    }
    
  })
  function getLevel(id,i,next){
    if(id==""||id==undefined||id==null){
      next(i);
    }else{
      Pbs.findById(id,function(err,res){
        if(err){
          console.log(err);
        }
        if(res==""||res==undefined){
          next(i);
        }else{
          getLevel(res.upper_pbs,++i,next);
        }    
      });
      
    }
  }
}
exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Pbs.remove({_id:{$in:ids}},function(err,pbs){
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
  Pbs.findById(id,function(err,pbs){
    if(err){
      console.log(err)
    }
    Pbs.populate(pbs,{
        path:'upper_pbs',
        model:'Pbs',
      },function(err,pbs){
      if(err){
        console.log(err)
      }
      getProject(function(projects){
        res.render('pbs/detail',{pbs:pbs,projects:projects})
      })
    })
  })
}