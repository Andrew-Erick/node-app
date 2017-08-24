 var Movie = require('../models/movie')
 var Comment = require('../models/comment')
 var Category = require('../models/category')
 var _ = require('underscore')
 var fs = require('fs') //读写文件的模块
 var path = require('path')


 //  list page
 exports.list = function(req, res) {
     Movie.fetch(function(err, movies) {
         if (err) {
             console.log(err);
         }
         res.render('list', {
             title: 'imooc 列表页',
             movies: movies
         })
     })
 }

 // detail pages
 exports.detail = function(req, res) {
     var id = req.params.id;
     Movie.update({
         _id: id
     }, {
         $inc: {
             pv: 1
         }
     }, function(err) {
         if (err) {
             console.log(err)
         }
     })
     Movie.findById(id, function(err, movie) {
         Comment
             .find({
                 movie: id
             })
             .populate('from', 'name')
             .populate('reply.from reply.to', 'name')
             .exec(function(err, comments) {
                 res.render('detail', {
                     title: 'imooc 详情页',
                     movie: movie,
                     comments: comments
                 })

             })

     })
 }

 // admin page
 exports.new = function(req, res) {
     Category.fetch(function(err, categories) {
         if (err) {
             console.log(err)
         }
         res.render('admin', {
             title: 'imooc 后台录入页',
             movie: {
                 title: '',
                 doctor: '',
                 country: '',
                 year: '',
                 poster: '',
                 flash: '',
                 summary: '',
                 language: ''
             },
             categories: categories

         })

     })
 }

 // admin post;

 exports.save = function(req, res) {
     var id = req.body.movie._id;
     var movieObj = req.body.movie;
     var _movie;
     if (req.poster) {
         movieObj.poster = req.poster;
     }
     if (id) {
         Movie.findById(id, function(err, movie) {
             if (err) {
                 console.log(err);
             }
             _movie = _.extend(movie, movieObj);
             _movie.save(function(err, movie) {
                 if (err) {
                     console.log(err);
                 }

                 res.redirect('/movie/' + movie._id);
             })
         })
     } else {
         _movie = new Movie(movieObj)
         var categoryId = movieObj.category
         var categoryName = movieObj.categoryName
         _movie.save(function(err, movie) {
             if (err) {
                 console.log(err);
             }
             if (categoryId) {
                 Category.findById(categoryId, function(err, category) {
                     if (err) {
                         console.log(err)
                     }
                     category.movies.push(movie._id);
                     category.save(function(err, category) {
                         res.redirect('/movie/' + movie._id);
                     })
                 })
             } else {
                 var category = new Category({
                     name: categoryName,
                     movies: [movie._id]
                 })
                 category.save(function(err, category) {
                     movie.category = category._id;
                     movie.save(function(err, movie) {
                         res.redirect('/movie/' + movie._id);
                     })
                 })
             }
         })
     }
 }

 // admin update movie

 exports.update = function(req, res) {
     var id = req.params.id;
     if (id) {
         Category.fetch(function(err, categories) {
             if (err) {
                 console.log(err)
             }
             Movie.findById(id, function(err, movie) {
                 res.render('admin', {
                     title: '后台更新页',
                     movie: movie,
                     categories: categories
                 })
             })
         })
     }
 }

 //list delete movie

 exports.delete = function(req, res) {
     var id = req.query.id;
     if (id) {
         Movie.remove({
             _id: id
         }, function(err, movie) {
             if (err) {
                 console.log(err);
             } else {
                 res.json({
                     success: 1
                 })
             }
         })
     }
 }

 // admin poster
 exports.savePoster = function(req, res, next) {
     var posterData = req.files.uploadPoster
     var filePath = posterData.path;
     var originalFilename = posterData.originalFilename
     console.log("req.files", req.files.uploadPoster)
     if (originalFilename) {
         fs.readFile(filePath, function(err, data) {
             console.log("filePath", filePath);

             var timestamp = Date.now();
             var type = posterData.type.split('/')[1]
             var poster = timestamp + '.' + type;
             var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)
             fs.writeFile(newPath, data, function(err) {
                 req.poster = "/upload/" + poster;
                 console.log("req.poster", req.poster);
                 next()
             })
         })
     } else {
         console.log("next");
         next()
     }
 }