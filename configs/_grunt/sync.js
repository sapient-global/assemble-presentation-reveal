module.exports = {
    js: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%= paths.src %>/js',
                src: '**/*',
                dest: '<%= paths.dist %>/js'
            }
        ]
    },
    ajax: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%= paths.src %>/ajax',
                src: '**/*.{json,html}',
                dest: '<%= paths.dist %>/ajax'
            }
        ]
    },
    assets: {
        files: [
            // includes files within path and its sub-directories
            {
                cwd: '<%= paths.src %>/assets',
                src: [
                    '**/{,*/}*'
                ],
                dest: '<%= paths.dist %>/assets'
            }
        ]
    },
    vendor: {
        files: [{
            cwd: '<%= paths.vendor %>/',
            src: [
                '**/{,*/}*.{css,js}'
            ],
            dest: '<%= paths.dist %>/vendor'
        }]
    }
};
