const mongoose = require('mongoose');

const createPostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surveyname: {
        type: String,
        required: true
    },
    questions: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('CreatePost',createPostSchema);