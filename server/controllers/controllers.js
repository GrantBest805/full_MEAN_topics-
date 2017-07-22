var mongoose = require('mongoose');
mongoose.Promise = Promise;
var User = mongoose.model("User")
var Topic = mongoose.model("Topic")
var Post = mongoose.model("Post")
var Comment = mongoose.model("Comment")
var Category = mongoose.model("Category")

module.exports = {
    loginReg: (req,res) => {
        User.findOne({name:req.body.name}, (err, user) => {
            if(user == null){
                let newUser = new User(req.body);
                newUser.save( (err, savedUser) => {
                    if(err){
                        console.log(err);
                        return res.sendStatus(500);
                    }else{
                        req.session.user = savedUser;
                        return res.json(savedUser);
                    }
                })
            }else{
                req.session.user = user;
                return res.json(user)
            }
        })
    },
    getCurrentUser: (req,res) => {
        if(!req.session.user){
            return res.status(401).send("Nice Try")
        }else{
            return res.json(req.session.user)
        }
    },
    logout: (req,res) => {
        req.session.destroy();
        res.redirect('/')
    },
    getCategories: (req, res) => {
        Category.find({}, (err, data) => {
            if(err){
                console.log(err)
                return;
            }else{
                return res.json(data);
            }
        })
    },
    createTopic: (req,res) => {
        console.log("started create topic")
        if(!req.session.user){
            return res.sendStatus(401);
        }
        User.findOne({_id: req.session.user._id}, (err, user) => {
            if(err){
                console.log(err)
                return res.sendStatus(500);
            }else{
                let topic = new Topic(req.body)
                topic._user = user._id
                topic.save( (err, savedTopic) => {
                    if(err){
                        console.log(err)
                        return;
                    }else{
                        console.log("this is the savedTopic",savedTopic)
                        user._topic.push(savedTopic);
                        user.save( (err, savedUser) => {
                            if(err){console.log(err)}
                            else{return res.json(savedTopic)}
                        })
                    }
                })
            }
        })
    },
    getTopics: (req, res) => {
        Topic.find({}).populate('_user').exec( (err, topics) => {
            if(err){
                console.log(err) 
                return res.sendStatus(500);
            }else{
                return res.json(topics)
            }
        })
    },
    getTopic: (req, res) => {
        Topic.findOne({_id:req.params.id}).populate('_user').populate({path: '_post', populate:{path:'_user'}}).populate({path: '_post', populate:{path:'_comments', populate:{path:'_user'}}}).exec( ( err, topic) => {
            if(err){
                console.log(err)
                return res.sendStatus(500);
            }else{
                return res.json(topic)
            }
        })
    },
    getTopicUser: (req, res) => {
        User.findOne({_id:req.params.id}, (err, user) => {
            if(err){
                console.log(err)
                return res.sendStatus(500)
            }else{
                return res.json(user)
            }
        })
    },
    createPost: (req, res) => {
        if(!req.session.user){
            return res.sendStatus(401);
        }
        Topic.findOne({_id:req.params.topic_id}, (err, topic)=>{
            if(err){
                console.log(err)
                return res.sendStatus(500)
            }else{
                let post = new Post(req.body)
                post._user = req.session.user._id;
                post.save( (err, savedPost) => {
                    if(err){
                        console.log(err)
                        return res.sendStatus(500)
                    }else{
                        topic._post.push(savedPost)
                        topic.save( (err, savedTopic)=>{
                            if(err){
                                console.log(err)
                                return res.sendStatus(500)
                            }else{
                                User.findOne({_id:req.session.user._id}, (err, user)=>{
                                    if(err){
                                        console.log(err)
                                        return req.sendStatus(500)
                                    }else{
                                      user._post.push(savedPost)
                                      user.save( (err, savedUser) =>{
                                          if(err){
                                              console.log(err)
                                              return req.sendStatus(500)
                                          }else{
                                              console.log("it workeddddddddddddddddd")
                                              return res.json(savedPost)
                                          }
                                      })
                                    }
                                })
                            }
                        })
                    }
                })

            }
        })
    },
    createComment: (req, res) => {
        console.log("started to createComment%%%%%%%%%%%%%%")
        if(!req.session.user){
            return res.sendStatus(401);
        } 
        Post.findOne({_id:req.params.post_id}, (err, post)=>{
            if(err){
                console.log(err)
                return res.sendStatus(500)
            }else{
                console.log("this is the create Comment post data",post)
                let comment = new Comment(req.body)
                comment._user = req.session.user._id;
                comment.save( (err, savedComment)=>{
                    if(err){
                        console.log(err)
                        return res.sendStatus(500)
                    }else{
                        User.findOne({_id:req.session.user._id}, (err, user)=>{
                            if(err){
                                console.log(err)
                                return res.sendStatus(500)
                            }else{
                                user._post.push(savedComment)
                                user.save( (err,savedUser) =>{
                                    if(err){
                                        console.log(err)
                                        return res.sendStatus(500)
                                    }else{
                                        console.log("it workeddddddddddddddddd")
                                        return res.json(savedComment)
                                    }
                                })
                            }
                        })

                    }
                })
            }
        })
    },
    

}