var express=require('express');
var router=express.Router();
var path=require('path');

router.use('/C'||'/c',express.static(path.join(__dirname,'../templates/template.c')));
router.use('/Cpp'||'/cpp',express.static(path.join(__dirname,'../templates/template.cpp')));
router.use('/java'||'/Java',express.static(path.join(__dirname,'../templates/template.java')));
router.use('/Python'||'/python',express.static(path.join(__dirname,'../templates/template.py')));
router.use('/Node'||'/node',express.static(path.join(__dirname,'../templates/template.js')));
// router.use('/c++'||'/C++',express.static(path.join(__dirname,'../templates/template.cpp')));
module.exports=router;