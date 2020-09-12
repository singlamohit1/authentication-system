import express from 'express';
import path from 'path';

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('register.ejs', { message: 'Hello World!' });
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.listen(PORT, () => {
    console.log('Server Started!');
});
