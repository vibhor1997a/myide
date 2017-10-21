var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var compile_run = require('compile-run');

function run(lang, code, input, callback) {
    if (lang == 'C') {
        compile_run.runC(code, input, function (stdout, stderr, err) {
            callback(stdout, stderr, err);
        });
    }
    else if (lang == 'C++') {
        compile_run.runCpp(code, input, function (stdout, stderr, err) {
            callback(stdout, stderr, err);
        });
    }
    else if (lang == 'Java') {
        compile_run.runJava(code, input, function (stdout, stderr, err) {
            callback(stdout, stderr, err);
        });
    }
    else if (lang == 'Python') {
        compile_run.runPython(code, input, function (stdout, stderr, err) {
            callback(stdout, stderr, err);
        });
    }
    else if (lang == 'Node.js') {
        compile_run.runNode(code, input, function (stdout, stderr, err) {
            callback(stdout, stderr, err);
        });
    }
    else {
        callback("", "", "Invalid Language!");
    }
}

router.post('/', function (req, res, next) {
    var code = req.body.code.trim();
    var input = req.body.stdin.trim();
    var lang = req.body.lang;

    run(lang, code, input, function (stdout, stderr, err) {
        if (!err) {
            console.log(stdout);
            console.log(stderr);
            res.send({
                stdout: stdout
                , stderr: stderr
            });
        }
        else {
            console.log(err);
        }
    });
});
module.exports = router;