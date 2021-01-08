const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hi Frankie');
});

app.listen(80, () => {
    console.log('Listen on port 80');
});