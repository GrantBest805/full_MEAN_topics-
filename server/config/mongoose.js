let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');

mongoose.connect('mongodb://localhost/belt_review');

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        //  require the file (this fund the model file which registers the schema)s
        require(models_path + '/' + file);
    }
});