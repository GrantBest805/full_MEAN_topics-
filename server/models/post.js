let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new mongoose.Schema({
    _user:{type:Schema.Types.ObjectId, ref:'User'},
    answer:{type:String, required:true},
    likes:[{type:String, required:false}],
    _comments:[{type:Schema.Types.ObjectId, ref:'Comment'}],
}, {timestamps:true})

var Post = mongoose.model('Post', PostSchema);