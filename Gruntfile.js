module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: 'sass/*.scss',
        tasks: ['sass']
      },
      pug: {
        files: 'pug/*.pug',
        tasks: ['pug']
      }
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
              // {
              //     'dist/index.html': ['pug/index.pug', 'pug/includes/*.pug']
              // },
              {
                  src: "pug/*.pug",
                  dest: "dist",
                  expand: true,
                  ext: ".html"
              } ]
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');


  grunt.registerTask('default', ['sass','pug']);

};
