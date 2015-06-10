module.exports = {
    options: {
        assets: '<%= paths.dev %>',
       // vendor: '/vendor',
        helpers: '<%= paths.src %>/templates/helpers/**/*.js',
        layoutdir: '<%= paths.src %>/templates/layouts/',
        context: { dest: '<%= paths.src %>/templates/data/' },
        data: '<%= paths.src %>/templates/data/**/*.{json,yml}',
        plugins: ['assemble-collection-context'],
        partials: [
            '<%= paths.src %>/templates/partials/**/*.hbs'
        ]
    },
    index: {
        options: {
          layout: 'tpl-default.hbs',
        },
        files: [{
            cwd: '<%= paths.src %>/templates/pages/',
            dest: '<%= paths.dev %>/',
            expand: true,
            flatten: true,
            src: ['index.hbs']
        }]
    },
    slides: {
        options: {
            layout: false,
            data: '<%= paths.src %>/templates/data/staticRevealConfig.json',
            collections: [{
                name: 'presentation',
                inflection: 'slide'
            }, {
                name: 'data'
            }, {
                name: 'classes',
                inflection: 'class'
            }]
        },
        files: [{
            cwd: '<%= paths.presentations %>/',
            dest: '<%= paths.dev %>/presentations/',
            expand: true,
            filter: 'isFile',
            extDot: ['md','hbs'],
            src: ['**/*']
        }]
    }
};
