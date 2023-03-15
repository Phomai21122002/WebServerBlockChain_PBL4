require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs  = require('express-handlebars');
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const route = require('./routes')
const db = require('./config/db')
db.connect()


const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  
}))
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.engine('hbs', hbs.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resource/views'))


route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

