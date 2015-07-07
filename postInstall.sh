#!/bin/bash
export PORT = $PORT
./node_modules/bower/bin/bower install
#./node_modules/grunt-cli/bin/grunt replace:socketUrl
./node_modules/grunt-cli/bin/grunt build
