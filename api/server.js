const express = require('express');
const cors = require('cors')
const userRouter = require('./users/users-router')

const {logger} =  require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(cors())
server.use(express.json())

// global middlewares and the user's router need to be connected here


// server.use("/api/users", logger, userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
