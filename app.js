const express = require('express');
const dotenv = require('dotenv');
//const ejs = require('ejs');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express();

dotenv.config({ path: './.env'});

// session store custom options
var session_options = {
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	createDatabaseTable: true,
	schema: {
		tableName: process.env.SESSION_TABLE,
		columnNames: {
			session_id: process.env.SESSION_ID,
			expires: process.env.SESSION_EXPIRY,
			data: process.env.SESSION_DATA
		}
	}
};

// create a new session store
let store = new MySQLStore(session_options);

//session deifnition
app.use(session({
	name: process.env.SESSION_NAME,
	cookie: {
		maxAge: 3600000 * 2,
	},
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store
}));

const limiter = rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100
});

// set view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
//app.use(limiter);


//display interactive messages using flash
app.use(flash());
app.get('/', (req, res)=>{
	res.redirect('/asset/dashboard')
})

/* check if user is logged in */
/*const redirectLogin = (req, res, next) =>{
     if(req.session.isAuth){
	  next()
    }else{
	   res.redirect('/')
    }
  } // end of check */

// only show login when user is logged out
/* const redirectDashboard = (req, res, next) =>{
     if(!req.session.isAuth){
		res.redirect('/asset/dashboard')
    }else{
		res.render('login')
   }
} // end of login check */

//dashboard redirect middleware
/*app.get('/', redirectDashboard, function(req, res) {
    res.render('login')
}); */

//altenative route for login page with dashboard redirect middleware
/*app.get('/login', redirectDashboard, function(req, res) {
    res.render('login')
}); */
// post route to receive login details and modify session variable
/* app.post('/login', function(req, res) {
	const { login_name, password } = req.body;
	console.log(req.body)
	//console.log(__dirname)
	if(login_name != process.env.USERNAME && password != process.env.PASSWORD){
		//req.session.isAuth = true;
		//req.session.user = req.body.login_name;
		res.redirect('/asset/dashboard')
	}else{
		res.render('login', {message: 'invalid login credentials'})
	}
}) // end of post route */

//post route to receive logout action, destroy user session
/* app.post('/logout', redirectLogin, (req, res) =>{
	req.session.destroy(function(err) {
	   if (err) throw err;
	   else{
		   res.redirect('/')
	   }
	  })
}) */

/*route imports */
const dashboardRouter = require('./routes/dashboard'); 
const addRouter = require('./routes/add');
const manageRouter = require('./routes/manage'); 

/* using imported routes */
app.use('/asset', addRouter);
app.use('/asset', dashboardRouter);
app.use('/asset', manageRouter);

/* start server on environment port */
app.listen(process.env.APP_PORT,  () => console.log(`server started on port ${process.env.APP_PORT}`));