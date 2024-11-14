const express = require('express');
const wordsRouter = require('./wordsRouter')
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the dictionary application');
});


app.use('/', wordsRouter)
// index.js i de siz daxil edin yuxaridaki kimi

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
