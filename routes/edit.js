const { request } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../database');
let current_id;

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/edit/:id', function(req, res) {
    res.render('./asset/edit', {username: req.session.user, title: 'Edit Asset: Asset Manager', message: req.flash('message')});
  console.log('get request: /asset/edit');
});

router.post('/edit', (req, res) =>{
	const asset_cat = req.body.asset_cat;
	const asset_type = req.body.asset_type;
	const model = req.body.model;
	const device_name = req.body.device_name;
	const serial_no = req.body.serial_no;
	const manufacturer = req.body.manufacturer;
	const os = req.body.os;
	const role = req.body.role;
	const sipadd = req.body.sipadd;
	const iloipadd= req.body.iloipadd;
	const datacenter = req.body.datacenter;
	const lane = req.body.lane;
	const  rack = req.body.rack;
	const status = req.body.status;
	const support = req.body.support;
	const support_name = req.body.support_name;
	const s_owner = req.body.s_owner;
	const s_admin = req.body.s_admin;
	const services = req.body.services;
	
	const sql = "UPDATE asset SET (asset_cat, asset_type, model, device_name, serial_no, manufacturer, os, role, sipadd, iloipadd, datacenter, lane, rack, status, support, support_name, s_owner, s_admin, services) VALUES ('"+ asset_cat +"', '"+ asset_type +"', '"+ model +"', '"+ device_name +"', '"+ serial_no +"', '"+ manufacturer +"', '"+ os+"', '"+ role +"', '"+ sipadd +"', '"+ iloipadd +"', '"+ datacenter +"', '"+ lane +"', '"+ rack +"', '"+ status +"', '"+ support +"', '"+ support_name +"', '"+ s_owner +"', '"+s_admin +"', '"+services+"')";
	console.log(req.body);
	
	db.query(sql, function (err, data, fields) {
		if (!err){
			req.flash('message', 'Asset added susccessfully')
			res.redirect('add')
		} else {
		res.send(err.message);
	}});
	console.log('post request: /add/asset');
});

module.exports = router;

str = "today"+
		"tomorrow";