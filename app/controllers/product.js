var Pbs=require('../models/pbs');
var _ = require('underscore');

// pbslist page
exports.index=function(req,res){
    res.render('pbs/index')
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