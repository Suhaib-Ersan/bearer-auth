'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

// const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL || "postgres://suhaib@localhost:5432/class03-04"

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  }
} : {}

const sequelize = new Sequelize(DATABASE_URL, {});

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
}
