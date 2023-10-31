<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const { Auntendication, getallusers } = require("../Model/user.model");
const states = require("country-state-city").State;

const getall_users = async (req, res) => {
  try{
    const user = await getallusers();
  console.log("users", user);
  if (user.rowCount === 0) {
    res.status(200).send({
      status: 404,
      message: "user not found",
    });
  }
  res.status(200).send({
    status: 200,
    data: user.rows,
  });
  }catch(err){
    console.log(err)
    res.status(500).send({message:'internal server error'})
  }
  
};

const userauth = async (req, res) => {
  // console.log(req.headers)
  try{const { username, password } = req.body;
  const user = await Auntendication({ username, password });
  if (user.rowCount === 0) {
    res.status(200).send({
      status: 404,
      message: "user not found",
    });
  }
  res.status(200).send({
    status: 200,
    data: user.rows,
    token: jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          data: user?.rows[0]?.user_id,
        },
      },
      "ticket"
    ),
    message: "User fetched successfully",
  });}catch(err){
    res.status(500).send({message:'internal server error'})
  }
  
};

const auth = (req, res, next) => {
  const { token } = req.headers;
  try {
    jwt.verify(token, "ticket", (err, decode) => {
      if (err) {
        res.status(200).send({
          status: 401,
          message: err,
        });
      }
      next();
    });
  } catch (err) {
    console.log("token", err);
  }
  // next()
};

const getLocation = (req, res) => {
  try{
     const state = states.getStatesOfCountry("IN");
  if (state !== null) {
    res.status(200).send({ status: true, statusCode: 200, data: state, message:'States fetch successfully'});
  }
  else{
    res.status(404).send({ status: true, statusCode: 404, message:'Unable To fetch States' });
  }
  }catch(err){
    console.log(err)
    res.status(500).send({message:'internal server error'})
  }
 
};

module.exports = {
  auth,
  userauth,
  getall_users,
  getLocation,
};
=======
const jwt = require("jsonwebtoken");
const { Auntendication, getallusers } = require("../Model/user.model");
const states = require("country-state-city");
const nodemailer = require('nodemailer')
const speakeasy = require('speakeasy')


const getall_users = async (req, res) => {
  try {
    const user = await getallusers();
    console.log("users", user);
    if (user.rowCount === 0) {
      res.status(200).send({
        status: 404,
        message: "user not found",
      });
    }
    res.status(200).send({
      status: 200,
      data: user.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};

const userauth = async (req, res) => {
  // console.log(req.headers)
  try {
    const { username, password } = req.body;
    const user = await Auntendication({ username, password });
    if (user.rowCount === 0) {
      res.status(200).send({
        status: 404,
        message: "user not found",
      });
    }
    res.status(200).send({
      status: 200,
      data: user.rows,
      token: jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            data: user?.rows[0]?.user_id,
          },
        },
        "ticket"
      ),
      message: "User fetched successfully",
    });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
};

const auth = (req, res, next) => {
  const { token } = req.headers;
  try {
    jwt.verify(token, "ticket", (err, decode) => {
      if (err) {
        res.status(200).send({
          status: 401,
          message: err,
        });
      }
      next();
    });
  } catch (err) {
    console.log("token", err);
  }
  // next()
};

const getLocation = (req, res) => {
  try {
    const state = states.State.getStatesOfCountry("IN");
    if (state !== null) {
      res
        .status(200)
        .send({
          status: true,
          statusCode: 200,
          data: state,
          message: "States fetch successfully",
        });
    } else {
      res
        .status(404)
        .send({
          status: true,
          statusCode: 404,
          message: "Unable To fetch States",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};

const getCities = (req, res) => {
  try {
    const cities = states.City.getCitiesOfCountry('IN');
    if(cities != null){
      res
        .status(200)
        .send({
          status: true,
          statusCode: 200,
          data: cities,
          message: "Cities fetch successfully",
        });
    } else {
      res
        .status(404)
        .send({
          status: true,
          statusCode: 404,
          message: "Unable To fetch Cities",
        });
    }
    }
    catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
};

const emailVerification = async(req, res) => {
  const emails = "testingticket0@gmail.com";  
  const pwd = "19011999@r";  

  const {email} = req.body

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    port:584,
    secure:false,
    auth: {
      user: process.env.email,
      pass: process.env.email_pws
    }
  });

  var mailOptions  = (otp) =>
   ( {from:{
    name:'ticket booking',
    email:emails
   } ,
    to: email,
    subject: `Ticket Booking`,
    text: `Your One-Time-Password for Ticket Booking is ${otp}`})
  
  try { 
    const secret = speakeasy.generateSecret({ length: 20 }); 
    const code = speakeasy.totp({ 
      secret: secret.base32, 
      encoding: 'base32'})
    if(code !== null){
      transporter.sendMail(mailOptions(code), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send({
            states:true,
            statusCode:200,
            message:"Email send successfully"})
        }
      });
    }
  } catch (error) { 
    res.status(500).send({message:"Internal server error"})
  } 
}

module.exports = {
  auth,
  userauth,
  getall_users,
  getLocation,
  getCities,
  emailVerification,
};
>>>>>>> master
