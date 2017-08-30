var Preview=require('../models/preview');
var Project = require('../models/project')
var URL=require('url');
var querystring=require('querystring');
var _ = require('underscore');

// previewlist page
exports.index=function(req,res){
  getProject(function(projects){
    res.render('preview/index',{projects:projects});
    
  })
}
// preview list page
exports.list=function(req,res){
  Preview.fetch(function(err,preview){
    if(err){
      console.log(err);
    }
     res.json(preview);
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

// preview post

exports.save=function(req,res){
  var id=req.body._id;
  console.log("id",id);
  var previewObj=req.body;
  var _preview;
  if(typeof id!="undefined"){
    Preview.findById(id,function(err,preview){
      if(err){
        console.log(err)
      }
      _preview=_.extend(preview,previewObj);
      _preview.save(function(err,preview){
        if(err){
          console.log(err)
        }
        res.send(preview);
      })
    })
  }else{
    _preview=new Preview(previewObj);
    _preview.save(function(err,preview){
      if(err){
        console.log(err)
      }
      res.send(preview);
    })
  }

}

exports.delete=function(req,res){
  var ids=req.body.ids;
  if(ids!=null&&ids.length>0){
    Preview.remove({_id:{$in:ids}},function(err,preview){
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
  Preview.findById(id,function(err,preview){
    if(err){
      console.log(err)
    }
    getProject(function(projects){
      
      res.render('preview/detail',{preview:preview,projects:projects})
      
    })
  })
}