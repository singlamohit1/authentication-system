import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import { checkAuth } from './auth';

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    if (checkAuth(req)) {
        // Implement
    } else {
        res.redirect('/login');
    }
});

app.get('/register', (req, res) => {
    if (checkAuth(req)) {
        res.redirect('/');
    }

    if (req.method === 'POST') {

    } else {
        res.render('register.ejs');
    }
});

app.get('/login', (req, res) => {
    if (checkAuth(req)) {
        res.redirect('/');
    }

    if (req.method === 'POST') {

    } else {
        res.render('login.ejs');
    }
});

app.listen(PORT, () => {
    console.log('Server Started!');
});
