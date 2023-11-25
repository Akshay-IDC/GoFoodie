const express = require('express');
const router = express.Router();


router.post("/fooddata", (req,res)=>{
    try {
        
        res.send([global.items, global.category])

    } catch (error) {
        console.error(error.message);
        res.send("server Error")
    }
})

module.exports=router;