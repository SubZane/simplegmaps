'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('jquery.simplegmaps.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			files: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['src/jquery.<%= pkg.name %>.js'],
				dest: 'dist/jquery.<%= pkg.name %>.js'
			},
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/jquery.<%= pkg.name %>.min.js'
			},
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/**/*.js']
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'qunit']
			},
		},
		update_json: {
			// set some task-level options
			options: {
				src: 'package.json',
				indent: '\t'
			},
			// update bower.json with data from package.json
			bower: {
				src: 'package.json', // where to read from
				dest: 'bower.json', // where to write to
				// the fields to update, as a String Grouping
				fields: {
					'name': 'name',
					'title': 'title',
					'version': 'version',
					'description': 'description',
				}
			},
			simplegmaps: {
				src: 'package.json', // where to read from
				dest: 'jquery.simplegmaps.json', // where to write to
				// the fields to update, as a String Grouping
				fields: {
					'name': 'name',
					'title': 'title',
					'version': 'version',
					'description': 'description',
				}
			},

		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-update-json');

	// Default task.
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'version']);
	grunt.registerTask('version', ['update_json:bower', 'update_json:simplegmaps']);

};
