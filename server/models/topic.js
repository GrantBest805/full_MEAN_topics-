let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TopicSchema = new mongoose.Schema({
    _user:{type:Schema.Types.ObjectId, ref:'User'},
    topic:{type:String, required:true},
    description:{type:String, required:false},
    category:{type:String, required:true},
    _post:[{type:Schema.Types.ObjectId, ref:'Post'}],
},{timestamps:true})

let Topic = mongoose.model('Topic', TopicSchema);