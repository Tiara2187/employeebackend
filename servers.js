const express = require('express')
const bodyParser = require('body-parser')
const mongooseConnect = require('./config/connect')
const routes = require('./routes/index')
const cors = require('cors')
const http = require("http")

const normalizePort = val => {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
  };
  
  const onError = error => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
  };
  
  const servers = express();
  const port = normalizePort(process.env.PORT || "6000");
  servers.use(cors())

  mongooseConnect();

  servers.use(express.urlencoded({ extended: false }));
servers.use(bodyParser.urlencoded({ extended: true }));
servers.use(express.json());

servers.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

servers.use(routes);

const server = http.createServer(servers);
server.on("error", onError);
server.on("listening", onListening);

servers.listen(port, () => {
    console.log(`App runs on http://localhost:${port}`);
  });
  

