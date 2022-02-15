"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  firstname: {type: String, required:true},
  lastname: {type: String, required:true},
  email: {type: String, required:true},
  password: {type: String, required:true},
  confirmpassword: {type: String, required:true},
  tokens: [{token:{type:String}}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// generate a Token
UserModelSchema.methods.generateToken = async function(){
  try{
    const token = jwt.sign({_id:this._id.toString()}, "mynameisshaliniagrawalgoogledrive");
    this.tokens = this.tokens.concat({token:token})
    return token;

  }catch(error){
    res.send("Error is :" + error);
    console.log("Error is : " + error);
  }
}

// bcrypt a password
UserModelSchema.pre('save', async function(next){

  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = undefined;
  }
  next();
});

UserModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Register', UserModelSchema);