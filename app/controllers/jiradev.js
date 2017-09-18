var Project = require('../models/project');
var Projectserver=require('../models/projectserver');
var URL=require('url');
var querystring=require('querystring');
exports.index=function(req,res){
  var arg=URL.parse(req.url).query;
  var id=querystring.parse(arg).id;
  var conditions=(id==null?{}:{project:id});
  getProject(function(projects){ 
    Projectserver.fetch(conditions,function(err,projectserver){
      if(err){
        console.log(err);
      }
      console.log("projectserver",projectserver);
      res.render('jiradev/index',{projectserver:projectserver,baseUrl:"https://airplanejira.atlassian.net"
      });
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