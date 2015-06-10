module.exports = {
	livereload: {
		options: {
			livereload: '<%= connect.options.livereload %>'
		},
		files: [
			'<%= paths.dev %>/{,*/}*.html',
			'<%= paths.dev %>/css/{,*/}*.css',
			'<%= paths.dev %>/js/{,*/}*.js',
			'<%= paths.dev %>/img/**/*.{jpg,png}'
		]
	},
    js: {
        files: '<%= paths.src %>/js/**/*.js',
        tasks: 'sync:js'
    },
    ajax: {
        files: '<%= paths.src %>/ajax/**/*.{json,html}',
        tasks: 'sync:assets'
    },
    assets: {
        files: [
			'<%= paths.src %>/assets/**/*'
			],
        tasks: 'sync:assets'
    },
	scss: {
		files: '<%= paths.src %>/scss/**/*',
		tasks: 'sass:dist'
	},
	templates: {
		files: ['<%= paths.src %>/{templates/data/static*.*,templates/layouts,templates/partials}/**/{,*/}*.{md,hbs,yml,json}'],
	    tasks: ['newer:assemble']
	},
    pages: {
        files: ['<%= paths.src %>/templates/pages/**/{,*/}*.hbs'],
        tasks: ['newer:assemble:pages']
    }
};
