const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

//Config app
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(cookieParser())
app.set('view engine', 'ejs');

//Settings Router
const index = require('./routes/index');
const photos = require('./routes/photos');
const liveness = require('./routes/liveness');

app.use('/', index);
app.use('/photos', photos);
app.use('/liveness', liveness);

//Start app
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})

