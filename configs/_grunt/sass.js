module.exports = {
    options: {
        outputStyle: 'nested',
        sourceMap: true,
    includePaths: ['<%= paths.vendor %>/reveal.js/css']
    },
    dist: {
        files: {
            '<%= paths.dist %>/css/styles.css': '<%= paths.src %>/scss/styles.scss'
        }
    }
};
