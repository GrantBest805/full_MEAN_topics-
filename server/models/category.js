let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new mongoose.Schema({
    categories:{type:String, required:true},
},{timestamps:true})
var Category = mongoose.model('Category', CategorySchema);