const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //local host
      user : 'postgres',
      password : 'Fuckingshit!',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, () => {
    console.log('app is running in port 3001');
});


/*

/signin route --> req = POST  --> res = success/fail
/register route --> req = POST --> res = new created user
/profile/:userId --> req = GET --> res = user
/image --> req = PUT --> res = user count 

*/

