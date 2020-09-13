import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import { AUTH_PASS_KEY, AUTH_USER_KEY, checkAuth, getUsernameFromEmail, validateCredentials, validateRegistrationForm } from './auth';
import { insertUser } from './database';

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

    res.render('register.ejs', {
        dupticateCredentials: false
    });
});

app.post('/register', (req, res) => {
    if (!validateRegistrationForm(req.body)) {
        res.render('register.ejs', {
            dupticateCredentials: true
        });
    } else {
        insertUser(req.body);
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie(AUTH_USER_KEY);
    res.clearCookie(AUTH_PASS_KEY);
    res.redirect('/');
});

app.get('/login', (req, res) => {
    if (checkAuth(req)) {
        res.redirect('/');
    }

    res.render('login.ejs', {
        invalidCredentials: false
    });
});

app.post('/login', (req, res) => {
    const email = <string> req.body.email;
    const password = <string> req.body.password;

    if (validateCredentials(email, password)) {
        res.cookie(AUTH_USER_KEY, email);
        res.cookie(AUTH_PASS_KEY, password);
        res.redirect('/');
    } else {
        res.render('login.ejs', {
            invalidCredentials: true
        });
    }
});

app.listen(PORT, () => {
    console.log('Server Started!');
});
