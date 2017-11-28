const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');

const apiImage = require('./router/apiImagesRouter');
const apiUser = require('./router/apiUsersRouter');

let app = express();

app.engine("handlebars", exhbs({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(session({
  secret: 'hotgirl',
  cookie: {},
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render("home", { username : req.session.username || req.cookies.username });
});

app.get('/chat', (req, res) => {
  res.render("chat");
});

app.use('/api/images', apiImage);
app.use('/api/users', apiUser);
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/techkidshotgirl", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect db success");
  }
});

const server = http.createServer(app);
let io = socket(server);

let userList = [];
io.on("connection", socket => {
    console.log("one user just connect ", socket.id);
    socket.emit("welcomeMessage", "Welcome to server");
    socket.on("userSendMessage", data => {
      console.log(data);
      userList.forEach(value => {
        console.log(value);
        if (value.user === data.userTo) {
          console.log("send message");
          socket.broadcast.to(value.socketId).emit("newMessage", data.message);
          return;
        }
      })
    });
    socket.on("userJoin", data => {
      userList.push({ user : data.user, socketId : socket.id });
      socket.broadcast.emit("userConnect", `${data.user} just connect`);
    });
});

server.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});
