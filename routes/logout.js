var express=require('express');
var router=express.Router();

router.all('/',(req,res,next)=>{
    req.session.destroy(()=>{
        res.send('Logged out Successfully!');
    });
});

module.exports=router;