var Project = require('../models/project')
exports.index=function(req,res){
  console.log(req.query);
  getProject(function(projects){
      res.render('jira/index',{projects:projects, id : req.query['id'], type : req.query['type'] })
  })
}
exports.json=function(req,res){
  res.redirect('/atlassian-connect.json');
}
function getProject(next){
    Project.fetch(function(err, projects) {
        if (err) {
            console.log(err);
        }
        next(projects);
    })
}