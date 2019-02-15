/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
/*  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */
  
  suite('Routing tests', function() {

    var idToFind;
    var idToFail = '5c66c848a0d46523e8be98se';

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title: 'Test'})
        .end((err,res)=>{
         idToFind = res.body._id;
         assert.equal(res.status,200);
         assert.isObject(res.body, 'response should be an object');
         assert.property(res.body, '_id');
         assert.property(res.body, 'title');    
         assert.equal(res.body.title, 'Test');
         done();
        });
      });
 
    
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({})
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isString(res.body, 'response should be a string');  
         assert.equal(res.body, 'missing title');
         done();
      });
      
    });
 }); 
     

    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){  
        chai.request(server)
        .get('/api/books')
        .send({})
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isArray(res.body, 'response should be an Array');
         assert.property(res.body[0], '_id');
         assert.property(res.body[0], 'title');
         assert.property(res.body[0], '_id');
         done();
      });      
      
    });
      
    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/'+idToFail)
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isString(res.body, 'response should be a String');
         assert.equal(res.body, 'no book exists');
         done();
      });
    });
  
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
         chai.request(server)
        .get('/api/books/'+idToFind)
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isObject(res.body, 'response should be an Object');
         assert.property(res.body, '_id');
         assert.property(res.body, 'title');
         assert.property(res.body, 'comments');
         assert.isUndefined(res.body.commentcount);
         assert.isArray(res.body.comments);
         assert.equal(res.body._id, idToFind);
         assert.equal(res.body.title, 'Test');
         done();
      });
      });
    });
    });    
    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
         chai.request(server)
        .post('/api/books/'+idToFind)
        .send({comment: 'test comment'})
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isObject(res.body, 'response should be an Object');
         assert.property(res.body, '_id');
         assert.property(res.body, 'title');
         assert.property(res.body, 'comments');
         assert.isUndefined(res.body.commentcount);
         assert.isArray(res.body.comments);
         assert.equal(res.body._id, idToFind);
         assert.equal(res.body.title, 'Test');
         assert.equal(res.body.comments[0], 'test comment');
         done();
      });
      
    });

  });

 // 2 }); removed here .. custom tests
suite('DELETE /api/books/[id] => expect remove one with id', function(){
      
      test('Test Delete /api/books/[id]', function(done){
         chai.request(server)
        .delete('/api/books/'+idToFind)
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isString(res.body, 'response should be a String');
         assert.equal(res.body, 'delete successful');
         done();
      });
      
    });

  });
    
suite('DELETE /api/books/ => expect delete all documents in collection', function(){
      
      test('Test Delete /api/books/', function(done){
         chai.request(server)
        .delete('/api/books/')
        .end((err,res)=>{
         assert.equal(res.status,200);
         assert.isString(res.body, 'response should be a String');
         assert.equal(res.body, 'complete delete successful');
         done();
      });
      
    });

  });    
    
});
});