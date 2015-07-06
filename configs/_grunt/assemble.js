module.exports = {
    options: {
        assets: '<%= paths.dist %>',
        vendor: '/vendor',
        helpers: '<%= paths.src %>/templates/helpers/**/*.js',
        layoutdir: '<%= paths.src %>/templates/layouts/',
        context: {
            dest: '<%= paths.src %>/templates/data/dynamic/'
        },
        data: '<%= paths.src %>/templates/data/**/*.json',
        plugins: ['assemble-collection-context', 'assemble-reveal-builder'],
        partials: [
            '<%= paths.src %>/templates/partials/**/*.hbs'
        ],
        collections: [{
            name: 'slideDataAttr'
        }, {
            name: 'classes',
            inflection: 'class'
        }]
    },
    index: {
        options: {
            layout: 'tpl-default.hbs',
            presentatiobnPage: false
        },
        files: [{
            cwd: '<%= paths.src %>/templates/pages/',
            dest: '<%= paths.dist %>/',
            expand: true,
            flatten: true,
            src: ['index.hbs', 'masters.hbs']
        }]
    },
    slides: {
        options: {
            layout: 'tpl-presentation.hbs',
            presentationPage: true
        },
        files: [{
            cwd: '<%= paths.presentations %>/',
            dest: '<%= paths.dist %>/presentations/',
            expand: true,
            filter: 'isFile',
            extDot: ['md', 'hbs'],
            src: ['**/index.hbs', '**/master.hbs']
        }]
    }
};
