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
