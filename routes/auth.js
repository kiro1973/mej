const router = require('express').Router();
const User = require('../model/user');
const validation = require('../validation');
const bcryptjs=require('bcryptjs')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//VALIDTION
const Joi = require('@hapi/joi');


const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(6)
        .required(),

    password: Joi.string()
        .min(6)
        .required()
                    ,

    email: Joi.string()
        .email()
        .required()
})





/**
 * @openapi
 * /register:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     Parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
           
 *     responses:
 *       200:
 *         description: user registered succesfully.
 *       400:
 *         description: entered input in a wrong way
 */




router.post('/register', async (req, res) => {
    //validate before creating user 

    const { error } = validation.registerValidation(req.body);
    if (error) {
         res.status(400)
            return res.send({"eroor":error.details[0].message});
    }

    // checking if user already in db
    const emailExist=await User.findOne({email:req.body.email});
    //console.log(emailExist)
    if(emailExist) return res.status(400).send({"error":'Email already exists'})

    //hash passwords
const salt= await bcryptjs.genSalt(10);
const hashedPassword=await bcryptjs.hash(req.body.password,salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser=await user.save();
        res.send({"id": savedUser.name} );
    }catch(err){
        res.status(400).send(err);
    }
});
router.post('/login',async (req,res)=>{
    const { error } = validation.loginValidation(req.body);
    if (error) {
         res.status(400)
            return res.send(error.details[0].message);
    }
    const user=await User.findOne({name:req.body.name});
    //console.log(emailExist)
    if(! user) return res.status(401).send({"error":'user name does not exist'})
    
    //check password
    const validPass=await bcryptjs.compare(req.body.password,user.password);
    if (! validPass) return res.status(402).send({"error":'Invalid password'});

    //create and assign a token
    //const token=jwt.sign({_name:user.name},process.env.TOKEN_SECRET);
    //res.header('auth-token',token).send(token)

    //let him in
    res.send({"id":user._id})

})

module.exports = router;