'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('simplegmaps.json'),
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
				src: ['src/<%= pkg.name %>.js'],
				dest: 'dist/<%= pkg.name %>.js'
			},
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/<%= pkg.name %>.min.js'
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
			src: {
				files: ['src/*.js', 'src/*.json'],
				tasks: ['default']
			},
		},
		copy: {
			js: {
				flatten: true,
				expand: true,
				src: ['dist/<%= pkg.name %>.js', 'dist/<%= pkg.name %>.min.js'],
				dest: 'demo/js/',
			},
			json: {
				flatten: true,
				expand: true,
				src: ['src/dummy-markersdata.json'],
				dest: 'demo/dummy/',
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
				dest: 'simplegmaps.json', // where to write to
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
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task.
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'copy:json', 'copy:js', 'version']);
	grunt.registerTask('version', ['update_json:bower', 'update_json:simplegmaps']);

};
