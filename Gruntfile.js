module.exports = function (grunt) {
    'use strict';

    //load task require npm lib
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-zip');

    grunt.initConfig({
        modules: [],//to be filled in by build task
        pkg: grunt.file.readJSON('package.json'),
        dist: 'dist',
        filename: 'ui-xmomen',
        filenamecustom: '<%= filename %>-custom',
        meta: {
            modules: 'angular.module("ui.xmomen", [<%= srcModules %>]);',
            tplmodules: 'angular.module("ui.xmomen.tpls", [<%= tplModules %>]);',
            all: 'angular.module("ui.xmomen", ["ui.xmomen.tpls", <%= srcModules %>]);',
            cssInclude: '',
            cssFileBanner: '/* Include this file in your html if you are using the CSP mode. */\n\n',
            cssFileDest: '<%= dist %>/<%= filename %>-<%= pkg.version %>-csp.css',
            banner: [
                '/*',
                ' * <%= pkg.name %>',
                ' * <%= pkg.homepage %>\n',
                ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                ' * License: <%= pkg.license %>',
                ' */'
            ].join('\n')
        },
        //清除目录
        clean: {
            all: ['dist/**']
        },
//        concat: {
//            dist: {
//                options: {
//                    banner: '<%= meta.banner %><%= meta.modules %>\n',
//                    footer: '<%= meta.cssInclude %>'
//                },
//                src: [], //src filled in by build task
//                dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
//            },
//            dist_tpls: {
//                options: {
//                    banner: '<%= meta.banner %><%= meta.all %>\n<%= meta.tplmodules %>\n',
//                    footer: '<%= meta.cssInclude %>'
//                },
//                src: [], //src filled in by build task
//                dest: '<%= dist %>/<%= filename %>-tpls-<%= pkg.version %>.js'
//            }
//        },
        concat: {
            options: {
            },
            dist: {
                src: ['src/**/*.js'],//src文件夹下包括子文件夹下的所有文件
                dest: 'dist/xmomen-ui.js'//合并文件在dist下名为built.js的文件
            },
            dist_tpls: {
                src: ['template/**/*.html.js'],//src文件夹下包括子文件夹下的所有文件
                dest: 'dist/xmomen-ui-tpls.js'//合并文件在dist下名为built.js的文件
            },
            dist_custom: {
                src: ['dist/xmomen-ui-tpls.js','dist/xmomen-ui.js'],//src文件夹下包括子文件夹下的所有文件
                dest: 'dist/xmomen-ui-custom.js'//合并文件在dist下名为built.js的文件
            }
        },
        uglify: {
            build: {
                src: 'dist/xmomen-ui.js',//压缩源文件是之前合并的buildt.js文件
                dest: 'dist/xmomen-ui.min.js'//压缩文件为built.min.js
            },
            build_tpls: {
                src: 'dist/xmomen-ui-tpls.js',//压缩源文件是之前合并的buildt.js文件
                dest: 'dist/xmomen-ui-tpls.min.js'//压缩文件为built.min.js
            },
            build_custom: {
                src: 'dist/xmomen-ui-custom.js',//压缩源文件是之前合并的buildt.js文件
                dest: 'dist/xmomen-ui-custom.min.js'//压缩文件为built.min.js
            }
        },
        html2js: {
            dist: {
                options: {
                    module: null, // no bundle module for all the html2js templates
                    base: '.',
                    rename: function(moduleName) {
                        return moduleName;
                    }
                },
                files: [{
                    expand: true,
                    src: ['template/**/*.html'],
                    ext: '.html.js'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd:"src/", src: ['src/*'], dest: 'dist',filter: 'isFile'}
                ]
            }
        },
        zip: {
            "long-format": {
                "src": ["dist/**"],
                "dest": "dist.zip"
            }
        }
    });

    grunt.registerTask('build', 'requirejs web project', function () {
        grunt.task.run(['clean']);
        grunt.task.run(['html2js']);
        grunt.task.run(['concat']);
        grunt.task.run(['copy']);
        grunt.task.run(['uglify']);
    });

    grunt.registerTask('default', ['build']);
};