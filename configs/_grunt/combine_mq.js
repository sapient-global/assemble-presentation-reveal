module.exports = {
    options: {
        log: true
    },
    combineIt: {
        options: {
            beautify: false
        },
        src: '<%= paths.dist %>/css/styles.css',
        dest: '<%= paths.dist %>/css/styles.css'
    }
};