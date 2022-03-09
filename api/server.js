const express = require('express');
const cors = require('cors')
const userRouter = require('./users/users-router')

const {logger} =  require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(cors())
server.use(express.json())

// global middlewares and the user's router need to be connected here


server.use("/api/users", logger, userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

server.use((err, req, res, next) => { // eslint-disable-line
  console.log('disaster!')
  res.status(err.status || 500).json({
    message: `error: ${err.message}`,
    stack: err.stack
  })
})

module.exports = server;
