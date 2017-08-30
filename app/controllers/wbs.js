var Wbs=require('../models/wbs');
var Obs=require('../models/obs');
var Pbs=require('../models/pbs');
var Project = require('../models/project');
var URL=require('url');
var querystring=require('querystring');
var _ = require('underscore');

// wbslist page
exports.index=function(req,res){
    Pbs.fetch(function(err,pbs){
      if(err){
        console.log(err)
      }
      Obs.fetch(function(err,obs){
         if(err){
           console.log(err)
         }
         getProject(function(projects){ 
            res.render('wbs/index',{pbs:pbs,obs:obs,projects:projects});
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
// wbs list page
exports.list=function(req,res){
  Wbs.fetch(function(err,wbs){
    if(err){
      console.log(err);
    }
     res.json(wbs);
  })
}

// wbs post

exports.save=function(req,res){
  var id=req.body._id;
  var wbsObj=req.body;
  var _wbs;
  getLevel(wbsObj.upper_wbs,0,function(level){
    wbsObj.level=level;
    if(typeof id!="undefined"){
      Wbs.findById(id,function(err,wbs){
        if(err){
          console.log(err)
        }
        _wbs=_.extend(wbs,wbsObj);
        _wbs.save(function(err,wbs){
          if(err){
            console.log(err)
          }
          Wbs.findById(wbs._id,function(err,wbs){
            if(err){
              console.log(err)
            }
            res.send(wbs);
          })
        })
      })
    }else{
      _wbs=new Wbs(wbsObj);
      _wbs.save(function(err,wbs){
        if(err){
          console.log(err)
        }
         Wbs.findById(wbs._id,function(err,wbs){
              if(err){
                console.log(err)
              }
              res.send(wbs);
            })
        })
    }
    
  })
  function getLevel(id,i,next){
    if(id==""||id==undefined||id==null){
      next(i);
    }else{
      Wbs.findById(id,function(err,res){
        if(err){
          console.log(err);
        }
        if(res==""||res==undefined){
          next(i);
        }else{
          getLevel(res.upper_wbs,++i,next);
        }    
      });
      
    }
  }
}
exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Wbs.remove({_id:{$in:ids}},function(err,wbs){
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
  Wbs.findById(id,function(err,wbs){
    if(err){
      console.log(err)
    }
    Wbs.populate(wbs,[{
        path:'upper_wbs',
        model:'Wbs',
      },{
        path:'upper_obs',
        model:'Obs',
      },{
        path:'upper_pbs',
        model:'Pbs',
      }],function(err,wbs){
      if(err){
        console.log(err)
      }
      getProject(function(projects){
        res.render('wbs/detail',{wbs:wbs,projects:projects})
      })
    })
  })
}