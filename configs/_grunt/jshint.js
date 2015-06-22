module.exports = {
  options: {
    "node": true,
    "esnext": true,
    "bitwise": true,
    "camelcase": true,
    "curly": true,
    "eqeqeq": true,
    "immed": true,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "quotmark": "single",
    "undef": true,
    "unused": true,
    "strict": true,
    "browser": true,
    "globals": {
      "Reveal": true,
      "io": true
    }
  },
  all: [
    'Gruntfile.js',
     '<%= paths.src %>/js/**/*.js'
  ]
}
