module.exports = function(grunt) {

  grunt.initConfig({

  });

  grunt.registerTask('hello', function() {
	grunt.log.writeln('grunt says: hello');
  });
  
  grunt.registerTask('default', function() {
	grunt.log.writeln('grunt says: default');
  });

};