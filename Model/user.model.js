<<<<<<< HEAD
// const { response } = require("../router/use.router.js");
const db = require("../util/dbconnection.js");

const Auntendication = async (req) => {
  try {
    const resp = await db.query(
      `select * from USERS where user_name =$1 and user_password = $2`,
      [req.username, req.password]
    );
    return resp;
  } catch (err) {
    // if (err) throw err
    console.log("errin authendication", err);
  }
};

const getallusers = (req, res) => {
  try {
    const all_users = db.query("select * from USERS");
    return all_users;
  } catch (err) {
    console.log("error alluser",err)
  }
};

module.exports = { getallusers, Auntendication };
=======
// const { response } = require("../router/use.router.js");
const db = require("../util/dbconnection.js");

const Auntendication = async (req) => {
  try {
    const resp = await db.query(
      `select * from USERS where user_name =$1 and user_password = $2`,
      [req.username, req.password]
    );
    return resp;
  } catch (err) {
    // if (err) throw err
    console.log("errin authendication", err);
  }
};

const getallusers = (req, res) => {
  try {
    const all_users = db.query("select * from USERS");
    return all_users;
  } catch (err) {
    console.log("error alluser",err)
  }
};

module.exports = { getallusers, Auntendication };
>>>>>>> master
