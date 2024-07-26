const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


const authController = require("./controllers/auth.js");
const appointmentsController = require('./controllers/appointments.js');

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: true
}))


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// app.use(morgan('dev'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use(passUserToView); 

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/appointments`)
  } else {
    res.render('index.ejs')
  }
});

  
app.use("/auth", authController);
app.use(isSignedIn);
app.use('/users/:userId/appointments', appointmentsController); 


 app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});
  
const PORT = process.env.PORT ? process.env.PORT : '3000'