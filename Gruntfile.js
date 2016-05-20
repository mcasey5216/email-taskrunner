module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: 'sass/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        },
      },
      pug: {
        files: 'pug/*.pug',
        tasks: ['pug'],
        options: {
          reload: true
        },
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    sass: {
      dist: {
        files: {
          'css/style.css' : 'sass/style.scss'
        }
      }
    },
    pug: {
          compile: {
              options: {
                  client: false,
                  pretty: true,
                  data: {
                      debug: false
                  }
              },
              files: [
              {
                  src: "pug/*.pug",
                  dest: "dist",
                  expand: true,
                  ext: ".html"
              } ]
          }
      },
      inlinecss: {
    		main: {
    			options: {
    			},
    			files: {
    				'dist/pug/index.html' : 'dist/pug/index.html'
    			}
    		}
    	}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-inline-css');


  grunt.registerTask('default', ['sass','pug']);

};
