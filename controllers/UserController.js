const { validationResult } = require("express-validator");
const { UserModel } = require("../models");
const { Validations, uploadImage } = require("../middlewares");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const { cookie } = require("express/lib/response");

"use strict";

/**
 * Get all record
 * @param { req, res }
 * @returns JsonResponse
 */
 const index = async(req, res, next) => {
  try{
   // next() or
   return res.status(200).json({
     success: true,
     message: "Data fetched successfully.",
     data: {}
   });
  }
  catch (error) {
   return res.status(500).json({
     success: false,
     message:
       "We are having some error while completing your request. Please try again after some time.",
     error: error
   });
 }
}

/**
 * @api {post} /user Registration the User
 * @apiName RegisterUser
 * @apiGroup user
 * @apiDescription Register a new user
 * @apiBody {string} firstName first name of user
 * @apiBody {string} lastName last name of user
 * @apiBody {string} email email of user
 * @apiBody {string} password password of user
 * @apiBody {string} confirmpassword confirmpassword of user
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 201 CREATED
 * {
 *   message: "Register User successfully.",
 *   data: Newly registered user object,
 *}
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack 
 * }
 */

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    });

    return res.status(201).json({
      success: true,
      message: "Register User successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * @api {post} /user/login Login the User
 * @apiName LoginUser
 * @apiGroup user
 * @apiDescription Register user login
 * @apiBody {string} email email of register user
 * @apiBody {string} password password of register user
 * @apiSuccess (200) {String} email email of the User.
 * @apiSuccess (200) {String} password  password of the User.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *   render : "home/homepage",
 *   data: login the user ,
 *}
 * HTTP/1.1 422 UNPROCESSABLE ENTITY
 * {
 *    "error" : User Details is not correct!!
 * }
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "message": "We are having some error while completing your request. Please try again after some time."
 *   "error": actual error stack
 * }
 */

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await UserModel.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    if (isMatch) {
      const token = await useremail.generateToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 51704000000),
        httpOnly: true,
      });
      return res.status(200).redirect('/homepage');
    } else {
      return res.status(422).send("User Details is not correct!!");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
}

/**
 * update a record
 * @param { req, res }
 * @returns JsonResponse
 */
const update = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
/**
 * Destroy a record
 * @param { req, res }
 * @returns JsonResponse
 */
const destroy = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};

/**
 * Export as a single common js module
 */
module.exports = {
  index,
  register,
  login,
  update,
  destroy
};
