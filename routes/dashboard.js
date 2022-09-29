//importing express module
let express = require('express');
//making use of the router function of express module
let router = express.Router();

//import database configuration
let db = require('../database');

/* API route to get count of all assets with static query parameters */
router.get('/all', (req, res) =>{
  let allData = {};
  const all_sql="SELECT COUNT(`device name`) AS winserv FROM asset WHERE os='windows';"+
                  "SELECT COUNT(`device name`) AS winprod FROM asset WHERE os='windows' AND status='production';"+
                  "SELECT COUNT(`device name`) AS linprod FROM asset WHERE os='Linux' AND status='production';"+
                  "SELECT COUNT(`device name`) AS linserv FROM asset WHERE os='Linux';"+
                  "SELECT COUNT(`device name`) AS network FROM asset WHERE `asset category`='switch' OR `asset category`='firewall' OR `asset category`='wireless_controller';"+
                  "SELECT COUNT(`device name`) AS deserv FROM asset WHERE status='decomissioned';"+
                  "SELECT COUNT(`device name`) AS storserv FROM asset WHERE `asset category`='storage_system';"+
                  "SELECT COUNT(`device name`) AS powoff FROM asset WHERE status='Powered Off';"+
                  "SELECT COUNT(`device name`) AS relserv FROM asset WHERE status='relocated';"; 

  db.query(all_sql, (err, data) =>{
    if(err) {
      console.log(err)
      return
    }else{
      //console.log(data.length)
      if (data.length>0){
        for (let i=0; i<data.length; i++){
          allData[Object.keys(data[i][0])] = data[i][0][Object.keys(data[i][0])];
         }
         //console.log(all)
         res.removeHeader('content-security-policy')
	       res.removeHeader('x-xss-protection')
         res.setHeader('Content-Type', 'application/json')
         console.log(res.getHeaders())
         res.status(200).json(allData)
      }else{
        res.status(200).json({'message': 'No data today'})
      }
    }
  })
}); // end of query


/* dashboard get route */
router.get('/dashboard', (req, res) =>{
  /*const session_sql="SELECT data FROM assetsessionsstore WHERE session_id=?";
  let username;
  db.query(session_sql, [req.sessionID], (err, data) =>{
      if(err) {
        console.log(err)
        return
      }else{
        //username = JSON.parse(data[0]['data']).user
       // res.render('./asset/dashboard', { username })  
      } */
      res.render('./asset/dashboard')
  //  })
}); //end of route */

//export to reach it in app.js
module.exports = router;