module.exports = {
	files: [
		"!<%= paths.src %>/js/vendor/**/*.js",
    "!<%= paths.vendor %>/**/*.js",
		"!<%= paths.src %>/js/libs/**/*.js",
		"<%= paths.src %>/js/**/*.js"
	]
};