/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
var mongoose = require('mongoose');

mongoose.connect(MONGODB_CONNECTION_STRING, {useNewUrlParser: true});

var Schema = mongoose.Schema;

var bookModel = new Schema({
title: {type: String, required: true},
commentcount: {type: Number, default: 0},
comments: [String]
});

var book = mongoose.model('book', bookModel);

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
    var q = req.query.string;
    book.find(q,(err,data)=>err ? err.stack : res.json(data));
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
    var title;
     (req.body.title) ? title = req.body.title : res.json('missing title');
      var addBook = new book({title: title});
    addBook.save((err,data)=>(err ? err.stack : res.json(data)));
    
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
    var bookid = {_id: req.params.id};
    book.findById(bookid,(err,data)=> { 
      if(err) {
        if(err.reason == undefined) return res.json('no book exists');
      } 
     return res.json({"_id": data._id, "title": data.title, "comments": data.comments});
    })
    })
    
    .post(function(req, res){
      var bookid = {_id: req.params.id};
      var comment = req.body.comment;
    
    book.findById(bookid, (err,data)=> {
    if(err) {
    if (err) return res.json('no book exists');
    }
      data.comments.push(comment);
      data.commentcount = data.comments.length;
      data.save((err,data) => err ? err : res.json({"_id": data._id, "title": data.title, "comments": data.comments}));
    })
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
