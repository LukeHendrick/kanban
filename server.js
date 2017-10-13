const express = require('express');
const compression = require('compression')
const app = express();
const PORT = process.env.PORT || 3000;

app.use('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url)
    } else {
        return next();
    }
})


app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});