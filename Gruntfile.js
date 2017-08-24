module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'app/models/**/*.js', 'app/schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            json:{
               files: ['public/data/**'],
                options: {
                    livereload: true
                } 
            },
            uglify: {
                files: ['public/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['public/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/build/index.css': 'public/less/index.less'
                }
            }
        },
        uglify: {
            development: {
                files: {
                    'public/build/admin.min.js': 'public/js/admin.js',
                    'public/build/activity.min.js': 'public/js/activity.js',
                    'public/build/detail.min.js': [
                        'public/js/detail.js'
                    ]
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    nodeArgs: ['--debug'],
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watch: ['./'],
                    delay: 1000,
                    env: {
                        PORT: '3000'
                    },
                    cwd: __dirname
                }
            }
        },
        // mochaTest: {
        //     options: {
        //         reporter: 'spec'
        //     },
        //     src: ['test/**/*.js']
        // },
        concurrent: {
            tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-livereload')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    // grunt.loadNpmTasks('grunt-mocha-test')
    grunt.loadNpmTasks('grunt-contrib-less') //less文件
    grunt.loadNpmTasks('grunt-contrib-uglify') //js文件的压缩
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.option('force', true)

    grunt.registerTask('default', ['concurrent'])
    // grunt.registerTask('test', ['mochaTest'])
}