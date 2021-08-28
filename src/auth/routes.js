"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("./models/index.js");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    console.log("at signup");
    let userRecord = await users.create(req.body);
    console.log("after create at signup");
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: {
      id: req.user.id,
      username: req.user.username,
      password: req.user.password,
    },
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get("/users", bearerAuth, async (req, res, next) => {
  const allUsers = await users.findAll({});
  const list = allUsers.map((user) => user.username);
  res.status(200).json(list);
});

authRouter.get("/secretstuff", bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!");
});

module.exports = authRouter;
