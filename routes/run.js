var express = require('express');
var path = require('path');
var router = express.Router();
var spawn = require("child_process").spawn;
var fs = require('fs');


/*Async function to run c code and pass stdout,stderr to the callback fn*/
function runC(fileName, stdin, callback) {
    var proc = spawn('gcc', ["./code/c/"+fileName+".c", "-o", "./code/c/"+fileName]);
    var stdout = "";
    var stderr = "";
    var f = false;
    var timeout = setTimeout(function () {
        proc.stdin.pause();
        proc.kill();
        f = true;
    }, 2000);
    proc.stderr.on('data', function (_stderr) {
        stderr += _stderr;
    });
    proc.stderr.on('end', function () {
        proc.kill();
        f = true;
    });
    proc.on('close', function (code) {
        proc.kill();
        f=true;
        if (code == 0) {
                console.log(code);
            var proc1 = spawn('./code/c/'+fileName+'.exe');
            var stdout1 = "";
            var stderr1 = "";
            var fl = false;
            var timeout1 = setTimeout(function () {
                proc1.stdin.pause();
                proc1.kill();
                fl = true;
            }, 2000);
            if(stdin){
            proc1.stdin.write(stdin+"\n");
            }
            proc1.stdout.on('data', function (_stdout) {
                stdout1 += _stdout;
            });
            proc1.stdout.on('end', function () {
                proc.kill();
                fl = true;
            });
            proc1.stderr.on('data', function (_stderr) {
                stderr1 += _stderr;
            });
            proc1.stderr.on('end', function () {
                proc.kill();
                fl = true;
            });
            proc1.on('close',function(code){
                if(code==0)
                callback(stdout1,"");
                else{    
                callback("","NZEC");    
                }
            });
            if (fl) {
                clearTimeout(timeout1);
            }
        }
        else{
        callback("",stderr);            
        }
    });
    if (f) {
        clearTimeout(timeout);
    }
}
router.get('/', function (req, res, next) {

});
router.post('/', function (req, res, next) {
    var code = req.body.code.trim();
    var fileName = 'abc-'+Math.floor(Math.random()*100000);
    var input=req.body.stdin.trim();
    fs.writeFile('./code/c/' + fileName+'.c', code, function (err) {
        if (!err) {
            runC(fileName,input,function(stdout,stderr){
                console.log(stdout);
                console.log(stderr);
                    res.send({stdout:stdout,stderr:stderr});
            });
        }
        else {
            console.log(err);
        }
    });
});
module.exports = router;