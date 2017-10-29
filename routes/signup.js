var express = require('express');
var path = require('path');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/*Check sign in by checking the existence of user object in the current session*/
function checkSignIn(req, res, next) {
    if (!req.session.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}

router.get('/', checkSignIn, express.static(path.join(__dirname, '../html/signup.html')));

/*handle signup*/
router.post('/', checkSignIn,(req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var databaseUrl = 'mongodb://localhost:27017/myide';
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) {
            console.log(err);
            res.send('Internal Server Error').status(500);
        }
        var userObj = { name: name, email: email, password: password };
        db.collection("user").insertOne(userObj, function (err, result) {
            if (err) {
                console.log(err);
                db.close();
            }
            else {
                userObj.id=result.insertedId;
                delete userObj.password;
                req.session.user = userObj;
                console.log("1 document inserted");
                db.close();
                res.redirect('/');
            }
        });
    });
});

module.exports = router;