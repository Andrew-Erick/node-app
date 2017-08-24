var Movie = require('../models/movie')
var Category = require('../models/category')
exports.index = function(req, res) {
    Category.find({})
        .populate({
            path: 'movies',
            options: {
                limit: 5
            }
        }).exec(function(err, categories) {
            if (err) {
                console.log(err);
            }
            res.render('index', {
                title: '首页',
                categories: categories
            })
        })

}

exports.search = function(req, res) {
    var page = parseInt(req.query.p, 10) || 1;
    var size = parseInt(req.query.size, 10) || 10;
    var catId = req.query.cat;
    var index = (page - 1) * size;
    var q = req.query.q;
    if (catId) {
        Category
            .find({
                _id: catId
            })
            .populate({
                path: "movies",
            }).exec(function(err, categories) {
                if (err) {
                    console.log(err)
                }
                // 获取分页数据
                var category = categories[0] || {}
                var movies = category.movies || []
                var results = movies.slice(index, index + size);
                res.render('result', {
                    title: 'imooc 结果列表界面',
                    keyword: category.name,
                    currentPage: page,
                    // query: 'q=' + q,
                    totoalPage: Math.ceil(movies.length / size),
                    movies: results
                })
            })

    } else {
        Movie.find({
            title: new RegExp(q + '.*', 'i')
        }).exec(function(err, movies) {
            res.render('result', {
                title: 'imooc结果列表界面',
                keyword: q,
                currentPage: page,
                totoalPage: Math.ceil(movies.length / size),
                movies: movies
            })
        })
    }
}