module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'controllers.js', 'config.js']
        },
        cssmin: {
            combine: {
                files: {
                    'build/all.css': ['app.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                src: ['config.js','controllers.js'],
                dest: 'build/app.js'
            }
        },
        htmlbuild: {
            dist: {
                src: 'app.html',
                dest: 'build/',
                options: {
                    beautify: false,
                    relative: true,
                    styles: {
                        bundle: 'build/all.css'
                    },
                    scripts: {
                        main: 'build/app.js'
                    }
                }
            }
        }
    });
    
    // load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html-build');

    // Default task(s).
    grunt.registerTask('default', ['jshint','uglify','cssmin','htmlbuild']);
    
};
