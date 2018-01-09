module.exports = function (grunt) {
	'use strict';
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bake');
	grunt.loadNpmTasks('grunt-combine-mq');
	grunt.initConfig({
		bake: {
			default: {
				files: {
					'build/example.html': 'src/example.html',
					'build/scss-example.html': 'src/scss-example.html'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					keepalive: true,
					livereload: true,
					base: 'build',
					hostname: '*'
				}
			}
		},
		copy: {
			js: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: ['**'],
					dest: 'build/js'
				}]
			},
			img: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['**'],
					dest: 'build/img'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					cwd: 'src/fonts',
					src: ['**'],
					dest: 'build/fonts'
				}]
			}
		},
		imagemin: {
			png: {
				options: {optimizationLevel: 7},
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['**/*.{png,jpg}'],
					dest: 'src/img'
				}]
			}
		},
		less: {
			default: {
				files: {
					'build/css/1-structure.css': 'src/less/1-structure.scss',
					'build/css/2-bem.css': 'src/less/2-bem.scss',
					'build/css/3-nesting.css': 'src/less/3-nesting.scss',
					'build/css/4-organization.css': 'src/less/4-organization.less',
					'build/css/5-states-hooks.css': 'src/less/6-states-hooks.less',
					'build/css/6-manifest.css': 'src/less/6-manifest.less'
				},
				options: {
					//sourceMap: true,
				}
			}
		},

		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'build/css/scss/scss-global.css': 'src/scss/global.scss',
					'build/css/scss/scss-styleguide.css': 'src/scss/scss-styleguide.scss'
				}
			}
		},
		postcss: {
			options: {
				map: true,

				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}),
				]
			},
			dist: {
				src: 'build/css/*.css'
			}
		},
		combine_mq: {
			options: {

			},
			default: {
				files: {
					'build/css/1-structure.css': 'build/css/1-structure.css',
					'build/css/2-bem.css': 'build/css/2-bem.css',
					'build/css/3-nesting.css': 'build/css/3-nesting.css',
					'build/css/4-organization.css': 'build/css/4-organization.css',
					'build/css/5-manifest.css': 'build/css/5-manifest.css'
				}
			}
		},
		watch: {
			sass: {
				files: ['src/**/*.scss'],
				tasks: ['css'],
				options: { livereload: true }
			},
			less: {
				files: ['src/**/*.less'],
				tasks: ['less', 'combine_mq'],
				options: {livereload: true}
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['bake'],
				options: {livereload: true}
			},
			img: {
				files: ['src/**/*.{png,gif,jpg}'],
				tasks: [
					'copy:img',
					'imagemin'
				]
			}
		}
	});
	grunt.registerTask('default', [
		'less',
		'sass',
		'postcss',
		'bake',
		'copy'
	]);

	grunt.registerTask('css', [
		'less',
		'combine_mq',
		'sass',
		'postcss'
	]);
};
