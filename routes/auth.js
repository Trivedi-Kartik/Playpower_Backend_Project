const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const CreatePost = require('../model/CreatePosts');
const TakingPost = require('../model/TakingPosts');

//Register User
router.post('/register', async (req, res) => {

    // Check if this user already exisits
    let user = await User.findOne({ name: req.body.name });
    if (user) {
         res.status(400).send('That user already exisits!');
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            password: hashpassword
        });
        try{
            const saveduser = await user.save();
            res.send({user: user._id});
        }catch(error){
            res.status(400).send(error);
        }
    }
});

//Login User
router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name});
    if(!user) {
       return res.status(400).send('Name is not found');
    }else{
        const validpass = await bcrypt.compare(req.body.password, user.password);
        if(!validpass) {
            return res.status(400).send('Invalid Password');
        }else{
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);    
        }
    }
});


//Create a servey by Authenticate User
router.post('/createPosts', verify, async (req, res) => {
    const user = await User.findOne({_id: req.user});
    const name = user.name;
    const post = new CreatePost({
        name: name,
        surveyname: req.body.surveyname,
        questions: req.body.questions
    });
    try{
        const saveduser = await post.save();
        res.send({post: post._id});
    }catch(error){
        res.status(400).send(error);
    }
});

//Search the survey name and take the servey.
router.get('/searchGivenServey/:surveyname',function(req,res){
    var regex = new RegExp(req.params.surveyname,'i');
    CreatePost.find({surveyname: regex}).then((result) => {
        res.status(200).json(result);
    })
});

//Put the answer of survey.
router.post('/takingPosts', verify, async (req, res) => {
    //    res.send(req.user);
        const user = await User.findOne({_id: req.user});
        const name = user.name;
        const post = new TakingPost({
            surveygivenname: req.body.surveygivenname,
            surveytakenname: name,
            surveyname: req.body.surveyname,
            questions: req.body.questions,
            answer: req.body.answer
        });
        try{
            const saveduser = await post.save();
            res.send({post: post._id});
        }catch(error){
            res.status(400).send(error);
        }
});

//search the survey that is answered already
router.get('/searchTakenServey/:surveyname',function(req,res){
    var regex = new RegExp(req.params.surveyname,'i');
    TakingPost.find({surveyname: regex}).then((result) => {
        res.status(200).json(result);
    })
});


module.exports = router; 

