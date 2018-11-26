var mongoose = require('mongoose');

//Create Schema for our mongo database. substituting our previous created 'Post Class'
var PostSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdAt: Date,
    body: String,
    comments: [String],
    likes: Number,
    username: String
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
