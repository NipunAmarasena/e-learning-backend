const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const testRoute = require('./routes/test');
const isAuth = require('./middleware/auth');

const app = express();
const port = 8081;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res)=> {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'This is the first post!' }]
      });
});

app.use('/user', userRoute);
app.use('/test', isAuth, testRoute);

app.listen(port);
console.log('App running on port ' + port);