/*//let ldap = require('ldap');
let uuid = require('uuid');
var express = require('express');
var cookieParser = require('cookie-parser')
var router = express.Router();

const redirectLogin = (req, res, next) =>{
    if(!req.session.sessionID){
        res.redirect('/login')
    }else{
        next()
    }
}


router.get('/', function(req, res) {
    console.log(req.session);

    //console.lof(uuid.v1())
    // Cookies that have been signed
    res.render('login')
});

function authenticateDN(username, password){
    let client = ldap.createClient(`${process.env.LDAP_CLIENT}:${process.env.LDAP_PORT}`)  
    client.bind(username, password, (err)=>{
      if (err) res.send(err)
      else console.log('connection successful');
      return;
    })
}

/*router.post('/', function(req, res) {
    if (req.body.email == 'dade@me.com'  && req.body.password == 'email'){
        let session = {}
        let sessionID = uuid.v1();
        session[sessionID] = req.body;
        res.setHeader("Set-Cookie", ["sessionID=" + sessionID]);
        res.redirect("./asset/dashboard");
    }
}); */

//module.exports = router;