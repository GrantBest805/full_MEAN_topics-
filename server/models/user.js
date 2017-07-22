let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    _topic:[{type:Schema.Types.ObjectId, ref: 'Topic'}],
    _post:[{type:Schema.Types.ObjectId, ref: 'Post'}],
    _comment:[{type:Schema.Types.ObjectId, ref: 'Comment'}],
},{timestamps:true})

let User = mongoose.model('User', UserSchema);