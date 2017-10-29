var express = require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

/*Check sign in by checking the existence of user object in the current session*/
function checkSignIn(req, res, next) {
    if (!req.session.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}

router.get('/', checkSignIn, express.static(path.join(__dirname, '../html/login.html')));

/*handle Login*/
router.post('/', checkSignIn, (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var databaseUrl = 'mongodb://localhost:27017/myide';
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) {
            console.log(err);
            res.send('Internal Server Error').status(500);
        }
        var userObj = { email: email, password: password };
        db.collection("user").find(userObj).toArray(function (err, result) {
            if (err) {
                console.log(err);
                db.close();
                res.send('Internal Server Error').status(500);
            }
            else {
                if (result.length != 1) {
                    res.send('Invalid Login');
                }
                else {
                    req.session.user = result[0];
                    delete req.session.user.password;
                    res.redirect('/');
                }
            }
        });
    });
});

module.exports = router;