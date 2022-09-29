//import express module
const express = require('express');

//use router from express
const router = express.Router();

//import db connection
const db = require('../database');


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

//api route to return a set of data when page and limit is received,
//delete asset when del_id is received,
//and one asset when asset_id is received

router.get('/assets', (req, res) =>{
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const asset_id = req.query.asset_id;
	const del_id = req.query.del_id;
	const start_index = (page - 1) * limit;
	const end_index = page * limit;
	let sql;

	if (del_id){ 
		sql="UPDATE asset SET active_status=0 WHERE `asset id`= ?"
		db.query(sql, [del_id], function (err, data, fields) {
			if (err) throw err;
		    res.setHeader('Content-Type', 'application/json')
			res.status(200).json({'success': true});
	  });
	} else if (asset_id){
		sql = "SELECT * FROM asset WHERE active_status=1 AND `asset id`= ?";
		//console.log(asset_id);
		db.query(sql, [asset_id], function (err, data, fields) {
			if (err) throw err;
			//console.log(data[0])
			data[0]['time added'] = new Date(data[0]['time added']).toISOString().replace(/T/, ' ').replace(/\..+/, '')
			//console.log(data[0]['time added'])
			const results = {};
		
			results.results = data;
			res.setHeader('Content-Type', 'application/json')
			res.status(200).json(results);
	  });
	} else { 
		sql="SELECT * FROM asset WHERE active_status=1 ORDER BY id DESC";

		db.query(sql, function (err, data, fields) {
			if (err) throw err;
			const results = {};
		
			results.results = data.slice(start_index, end_index)
			results.totalPages = Math.ceil(data.length/limit);
		    res.setHeader('Content-Type', 'application/json')
			res.status(200).json(results);
	  });
	}
   console.log('get request: /asset/assets');
}); //end api

//main search results from javascript fetch request//
router.post('/assets', async (req, res) => {
	let payload = req.body.payload.trim();
	//payload = '^'+payload+'.*';
	//console.log(payload)
	sql = "SELECT * FROM asset WHERE active_status=1 AND `device name` REGEXP ? OR `service ip` REGEXP ? OR os REGEXP ?";
	//OR `service ip` REGEXP ? OR os REGEXP ?";
	db.query(sql, [payload, payload, payload], function (err, data, fields) {
		if (err) throw err;
		results = data.slice(0, 10)
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json({payload: results});
 	});	
}) // 

router.post('/track', async (req, res) => {
	let payload = req.body.payload.trim();
	console.log(payload)
	sql = "SELECT * FROM asset WHERE active_status=1 AND `device name` = ? ";
	db.query(sql, [payload], function (err, data, fields) {
		if (err) throw err;
		results = data.slice(0, 2)
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json({payload: results});
 	});	
}) // 

//get page param from query string
let page;
router.get('/manage', (req, res) =>{
	page = req.query.page;
	//console.log(req.query)
	res.render('./asset/man', {username: req.session.user, title: 'Manage Asset: Asset Manager', page });
  console.log('get request: /asset/manage'); //
});

//route to populate form field with asset by id
let id;
router.get('/edit/:asset_id', (req, res) =>{
	const asset_id = req.params.asset_id;
	id = asset_id;
	const asset_sql = "SELECT * FROM asset WHERE `asset id`= ?";
	db.query(asset_sql, [asset_id], function(err, asset_rows, fields) {
		if (!err) res.render('./asset/edit', {username: req.session.user, message: req.flash('message'), title: 'Edit Asset: Asset Manager', asset_data: asset_rows, asset_id: asset_id});
  });
  console.log('get request: /asset/edit');
}); // end of form fild entry

// deinining route for post edit//
router.post('/edit/', (req, res) =>{
	redirect_route = 'edit/'+req.body.asset_id;
	let param = [req.body.asset_cat, 
		req.body.asset_type,
		req.body.model,
		req.body.device_name.trim(),
		req.body.serial_no,
		req.body.manufacturer,
		req.body.os,
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
		req.body.asset_id
	]
	const asset_sql = "UPDATE asset SET `asset category`=?, "+
					"`asset type`=?, model=?, `device name`=?,"+
					"`serial no`=?, manufacturer=?, os=?, role=?,"+ 
					"`service ip`=?, `ilo ip`=?, datacenter=?, lane=?,"+
					"rack=?, status=?, support=?, `support name`=?,"+
					"`system owner`=?, `system admin`=?, services=? WHERE `asset id`=?";
	
	db.query(asset_sql, param, function(err, asset_rows, fields) {
		if (!err){
			req.flash('message', 'Asset updated susccessfully')
			res.redirect(redirect_route)
		} else {
		res.send(err.message);
		}
	});
  console.log('get request: /asset/edit/');
});  // end of edit post route

//view route
router.get('/view/:asset_id', (req, res) =>{
	//console.log(req.params.asset_id)
	res.render('./asset/view', {username: req.session.user, title: 'View Asset: Asset Manager', asset_id: req.params.asset_id});
  console.log('get request: /asset/view');
}); //end of view route


//delete route
router.get('/delete/:asset_id', (req, res) =>{
	//console.log(req.params.asset_id)
	res.status(200).json({title: 'Delete Asset: Asset Manager', del_id: req.params.asset_id});
  console.log('get request: /asset/manage');
}); //end of delete route

module.exports = router;