import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import { checkAuth , AUTH_PASS_KEY, AUTH_USER_KEY } from './auth';
import { insertUser, validUser , validateCredentials , getUsernameFromEmail} from './database';

const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");

var prompt=false;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    if (checkAuth(req)) {
        res.render('welcome.ejs', {
            username: getUsernameFromEmail(req.cookies[AUTH_USER_KEY]),
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/register', (req, res) => {
    if (checkAuth(req)) {
        res.redirect('/');
    }
    res.render('register.ejs',{
        prompt: prompt
    });
    prompt=false;
});

app.post('/register', (req, res) => {
    if(!validateCredentials(req.body))
    { 
        prompt=true;
        res.redirect('/register');
    }
    else
    {
        insertUser(req.body);
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
    res.cookie(AUTH_USER_KEY, ''); 
    res.cookie(AUTH_PASS_KEY, ''); 
    res.redirect('/');
});

app.post('/login', (req, res) => {
    if(validUser(req.body)) {
        res.cookie(AUTH_USER_KEY, req.body.email); 
        res.cookie(AUTH_PASS_KEY, req.body.password); 
        res.redirect('/');
    }
    else {
        prompt=true;
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    if (checkAuth(req)) {
        res.redirect('/');
    }
    res.render('login.ejs',{
        prompt:prompt
    });
    prompt=false;
});

app.listen(PORT, () => {
    console.log('Server Started!');
});
