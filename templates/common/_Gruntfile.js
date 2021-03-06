module.exports = function(grunt) {
	'use strict';

	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Change these configuration options to specify directory names
		config: {
			dist: 'dist',
			src: 'src',
		},

		// Sass compilation
		sass: {
			options: {
				includePaths: ['<%%= config.src %>/bower_components/foundation/scss'],
			},
			serve: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'.tmp/css/app.css': '<%%= config.src %>/scss/app.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'<%%= config.dist %>/css/app.css': '<%%= config.src %>/scss/app.scss'
				}
			}
		},

		<% if (jade) { %>
		// Jade compilation
		jade: {
			options: {
				pretty: true
			},
			serve: {
				options: {
					pretty: true,
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: '*.jade',
					dest: '.tmp',
					ext: '.html'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src',
					src: '*.jade',
					dest: '.tmp',
					ext: '.html'
				}]
			}
		},
		<% } %>


		// Test JavaScript files for code goodness
		jshint: {
			jshintrc: '.jshintrc',
			all: {
				src: [
					'Gruntfile.js',
					'<%%= config.src %>/js/{,*/}*.js'
				]
			}
		},

		// Livereloaded server running at 0.0.0.0:8000
		connect: {
			serve: {
				options: {
					open: true,
					livereload: true,
					base: [
						'.tmp',
						'src'
					]
				}
			},
			dist: {
				options: {
					base: 'dist'
				}
			}
		},

		// Watch files to perform tasks on changes
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			
			sass: {
				files: '<%%= config.src %>/scss/{,*/}*.scss',
				tasks: ['sass:serve'],
				options: {
					livereload: true
				}
			},

			<% if (jade) { %>
			jade: {
				files: '<%%= config.src %>/{,*/}*.jade',
				tasks: ['jade:serve'],
				options: {
					livereload: true
				}
			},
			<% } %>

			js: {
				files: '<%%= config.src %>/js/{,*/}*.js',
				tasks: ['jshint:all'],
				options: {
					livereload: true
				}
			},

			livereload: {
				files: [
					<% if (!jade) { %>
					'<%%= config.src %>/*.html',
					<% } %>
					'<%%= config.src %>/js/{,*/}*.js',
					'<%%= config.src %>/images/{,*/}*.{png,jpg,jpeg,webp}'
				],
				options: {
					livereload: true
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			serve: '.tmp',
			dist: ['.tmp', '<%%= config.dist %>']
		},

		// Copies files from src to dist
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%%= config.src %>',
					dest: '<%%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						<% if (!jade) { %>
						'*.html',
						<% } %>
						'js/{,*/}*.js',
						'images/{,*/}*.{png,jpg,jpeg,webp}',
						'fonts/{,*/}*.*'
					]
				}<% if (jade) { %>, {
					expand: true,
					cwd: '.tmp',
					dest: '<%%= config.dist %>',
					src: '*.html'
				}<% } %>]
			}
		},

		// Reads HTML for build blocks to enable smart builds that
		// reference the proper files
		useminPrepare: {
			<% if (!jade) { %>
			html: ['<%%= config.src %>/*.html'],
			<% } else { %>
			html: ['.tmp/*.html'],
			<% } %>
			options: {
				dest: '<%%= config.dist %>'
			}
	 	},				

		usemin: {
			html: '<%%= config.dist %>/*.html'
		},

		// Performs metrics on built assets
		phantomas: {
			test: {
				options: {
					url: 'http://0.0.0.0:8000'
				}
			}
		},

		open: {
			phantomas: {
				path: './phantomas/index.html'
			}
		}
	});

	grunt.registerTask('serve', 'Compile then start a web server', [
		'clean:serve',
		'sass:serve',
		<% if (jade) { %>
		'jade:serve',
		<% } %>
		'connect:serve',
		'watch'
	]);

	grunt.registerTask('test', [
		'jshint:all',
		'build',
		'connect:dist',
		'phantomas:test',
		'open:phantomas'
	]);

	grunt.registerTask('build', 'Generate dist folder with built assets', [
		'clean:dist',
		'jshint',
		<% if (jade) { %>
		'jade:dist',
		<% } %>
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'sass:dist',
		'copy:dist',
		'usemin'
	]);

	grunt.registerTask('default', ['serve']);
};
