const express = require ('express')
const router = express.Router();
const User = require('../Models/buser')
const bcrypt = require('bcrypt')                     
const jwt = require('jsonwebtoken'); 
const user = require('../Models/buser');


//signup
router.post('/signup', (req, res) => {   
    console.log(req.body)  
   bcrypt.hash(req.body.password,10)                    
   .then(hash =>{
    const user = new User ({                              
            
            first_name: req.body.first_name,
            surname: req.body.surname,
            username: req.body.username,
            password: hash,
            email: req.body.email
            
        });

    
         user.save().then(result =>{
       res.status(201).json({
        message: 'User has been created',        
        result:result
    });
   })
   .catch(err=> { console.error(err)
    res.status(500).json({
        error:err
    });
   });
});
})


//login 
router.post('/login', (req,res)=>{
    User.findOne({username:req.body.username})
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message:"Authentication Failure"
            });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {   
            if (err || !result) {
                return res.status(401).json({
                    message: "Authentication Failure"
                });
            }

            const token = jwt.sign({username:user.username,userid:user._id},
                'CONCODE',{expiresIn:'1h'}); 
            console.log('Login successful!'); 
            res.status(200).json({token:token});
        });
    })
    .catch(err => {
        return res.status(401).json({
            message:"Authentication Failure"  
        });
    });
})


module.exports = router