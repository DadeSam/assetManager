var express = require('express');
const { check , validatonResult, validationResult } = require('express-validator')
var router = express.Router();
var db = require('../database');

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/add', function(req, res) {
	//res.setHeader('Content-Type', 'text/html')
	//res.removeHeader('content-security-policy')
	//res.removeHeader('x-xss-protection')
	//console.log(res.getHeaders())
    res.render('./asset/add', {username: req.session.user, title: 'Add Asset: Asset Manager', message: req.flash('message')});
  console.log('get request: /asset/add');
});

router.post('/add', [
	check('device_name', 'Device Name cannot be empty').exists().isLength({ min: 1}),
	check('role', 'Please caption the role of the device').exists().isLength({ min: 6}),
	check('s_admin', 'Enter full name of system admin').exists().isLength({ min: 10}),
	check('s_owner', 'Enter full name of Sytem Owner').exists().isLength({ min: 6}),
	check('services', 'Services running is a required field').exists().isLength({ min: 5})

], (req, res) =>{
	let param = [req.body.asset_id,
		req.body.asset_cat, 
		req.body.asset_type,
		req.body.model.trim(),
		req.body.device_name.trim(),
		req.body.serial_no.trim(),
		req.body.manufacturer.trim(),
		req.body.os.trim(),
		req.body.role.trim(),
		req.body.sipadd.trim(),
		req.body.iloipadd.trim(),
		req.body.datacenter,
		req.body.lane.trim(),
		req.body.rack.trim(),
		req.body.status,
		req.body.support,
		req.body.support_name.trim(),
		req.body.s_owner.trim(),
		req.body.s_admin.trim(),
		req.body.services.trim(),
		dateTime
	]

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.render('./asset/add', {message: errors.array()})
		//console.log(errors.array())
		//console.log(typeof errors.array())
		return
	}
	
	const sql = "INSERT INTO asset (`asset id`, `asset category`," + 
				"`asset type`, model, `device name`, `serial no`, manufacturer, os," +
				"role, `service ip`, `ilo ip`, datacenter, lane, rack, status, support," + 
				"`support name`, `system owner`, `system admin`, services, `time added`," +
				"`active_status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)";

	try {
		db.query(sql, param, function (err) {
		if (!err){
			//req.flash('message', 'Asset added susccessfully')
			res.render('./asset/add', {message: 'Asset added successfully'})
			console.log('this is being sent', dateTime)
		} else {
			res.render('./asset/add', {message: 'Device with these details already exist'})
			console.log(err.sqlMessage)
	    }
	  })
	}catch(e) {
		console.log(e)
	}

	console.log('post request: /add/asset');
});

module.exports = router;