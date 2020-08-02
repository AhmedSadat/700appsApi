
const express = require('express');
const router = express.Router();


router.get('/',( req , res )=>{
    res.send("Hello it's me..hello from the other side");
});

module.exports = router ;


