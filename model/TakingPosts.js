const mongoose = require('mongoose');

const TakingPostSchema = new mongoose.Schema({
    surveygivenname: {
        type: String,
        required: true
    },
    surveytakenname: {
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
    answer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('TakingPost',TakingPostSchema);