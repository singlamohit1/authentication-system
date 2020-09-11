import express from 'express';

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log('Server Started!');
});
