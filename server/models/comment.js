let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new mongoose.Schema({
    comment:{type:String, required:true},
    _user:{type:Schema.Types.ObjectId, ref:'User'}
},{timestamps:true})
var Comment = mongoose.model('Comment', CommentSchema);