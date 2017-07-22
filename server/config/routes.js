var controller = require('../controllers/controllers');

module.exports = app => {
    app.post('/api/login', controller.loginReg);
    app.get('/api/login', controller.getCurrentUser);
    app.get('/logout', controller.logout);
    // DASHBOARD 
    app.get('/api/dashboard', controller.getCategories);
    app.post('/api/dashboard', controller.createTopic);
    app.get('/api/topic', controller.getTopics);
    // TOPIC
    app.get('/api/topic/:id', controller.getTopic);
    app.post('/api/topic/:topic_id', controller.createPost);
    app.post('/api/topic/comment/:post_id', controller.createComment);
    // USER
    app.get('/api/user/:id', controller.getTopicUser);
}