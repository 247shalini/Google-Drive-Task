"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageModelSchema = new Schema({
  
  image: {type: String,required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ImageModelSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

ImageModelSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

ImageModelSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


module.exports = mongoose.model('image', ImageModelSchema);