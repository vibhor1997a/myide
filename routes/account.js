var express=require('express');
var router=express.Router();

function checkSignIn(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}


router.get('/',checkSignIn,(req,res,next)=>{
    res.render('account',{
        user:req.session.user
    });
});

module.exports=router;