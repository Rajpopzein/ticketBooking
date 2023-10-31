const express = require("express");
const app = express();
const userController = require('../controler/user.controler.js')



//post api
app.post("/login", userController.userauth);
app.post("/emailAuth", userController.emailVerification)

//get api
app.get('/test', userController.auth, userController.getall_users);
app.get('/getlocation',userController.getLocation);
app.get('/allCities',userController.getCities);
app.get("/", (req, res) => {
  res.send({
    status: true,
    statusCode: 200,
    message: "Welcome",
  });
});

module.exports = app;
