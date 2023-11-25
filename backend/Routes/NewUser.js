const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { query, validationResult, body } = require('express-validator');

const jwt= require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret="MynameisBhupendroJogi!What?BhupendroJogi"

router.post("/createuser",
    [body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isStrongPassword()], async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({

                name: req.body.name,
                email: req.body.email,
                password: secpassword,
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

/////////.........OLD user??????////////////////////////////////
router.post("/olduser", [body('email').isEmail(),
body('password').isStrongPassword()], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Your Credentials are not Correct, Try Again" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Your Credentials are not Correct, Try Again" });
        }
        
        const data = {
            user:{
                id: userData.id
            }
        }
        const authToken= jwt.sign(data,jwtSecret)

        res.json({ success: true , authToken:authToken });

    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})


////////////////////////////////////////////////////////////////////////////////////

/*const Order =require('../models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({"email": req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
           // console.log(data)
           // console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})*/
module.exports = router;