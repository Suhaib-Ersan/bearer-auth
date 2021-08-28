"use strict";

const { users } = require("../models/index.js");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next("Invalid Login");
    }

    const token = req.headers.authorization.split(" ").pop();
    // console.log("reaches before autheadsad");
    const validUser = await users.authenticateToken(token);
    // console.log("reaches after autheadsad");
    req.user = validUser;
    req.token = validUser.token;
    // console.log("reaches before bearers next");
    next()
  } catch (e) {
    res.status(403).send({message:"Invalid Login", errorMessage:e.message});
  }
};
