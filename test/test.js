const assert = require('chai').assert;
const expect = require('chai').expect;
var request = require("request");
var should = require('should');

const baseUrl = "https://node-practice0208.herokuapp.com";


describe('order details',function(){
  it('return an order details',function(done){
    request.get({ url:baseUrl+'/delivery/request'},
      function(error,response,body){
        var bodyObj = JSON.parse(body);
        bodyObj.should.have.property('message').eql('This is the information for order');
        expect(bodyObj).to.have.property('cell');
        expect(bodyObj).to.have.property('location');
        expect(bodyObj).to.have.property('name');
        expect(bodyObj).to.have.property('id');
        expect(response.statusCode).to.equal(200);
        // console.log(body);
        done();
      });
  });
});

describe('food menu objects',function(){
  it('return array and status 200',function(done){
    request.get({ url:baseUrl+'/food_menu'},
      function(error,response,body){
        var bodyObj = JSON.parse(body);
        expect(bodyObj).to.be.a('array');
        expect(response.statusCode).to.equal(200);
        // console.log(body);
        done();
      });
  });
});

describe('login',function(){
  it('return login success',function(done){
    //request.post('http://service.com/upload', {form:{key:'value'}})
    //{"email":"calvintey@mail.com","password":"password" }
    //let info = { "email" :"calvintey@mail.com", "password" :"password" }
    request.post({url:baseUrl+'/login',form:{"email":"calvintey@mail.com","password":"password"}},
      function(error,response,body){
        expect(response.statusCode).to.equal(200);
        // console.log(body);
    var bodyObj = JSON.parse(body);
    bodyObj.should.have.property('email').eql('calvintey@mail.com');
    expect(bodyObj).to.have.property('cell');
    expect(bodyObj).to.have.property('result');
    expect(bodyObj).to.have.property('message');
    expect(bodyObj).to.have.property('email');
    expect(bodyObj).to.have.property('firstname');
    expect(bodyObj).to.have.property('lastname');
    done();
    });
  });
  it('return login failed',function(done){
    //request.post('http://service.com/upload', {form:{key:'value'}})
    //{"email":"calvintey@mail.com","password":"password" }
    // let info = { "email" :"cal@mail.com", "password" :"password" }
    request.post({url:baseUrl+'/login',form:{"email":"calvintey@mail","password":"password"}},
      function(error,response,body){
        expect(response.statusCode).to.equal(400);
        // console.log(body);
    var bodyObj = JSON.parse(body);
    bodyObj.should.have.property('message').eql('Login Failed');
    bodyObj.should.have.property('result').eql(false);
    done();
    });
  });
});

describe('register',function(){
  it('return register failed',function(done){
    request.post({url:baseUrl+'/register',form:{"email":"calvintey@mail.com"}},
      function(error,response,body){
        expect(response.statusCode).to.equal(400);
        var bodyObj = JSON.parse(body);
        expect(bodyObj).to.have.property('message');
        bodyObj.should.have.property('result').eql(false);
        done();
      });
    });
    it('return register success',function(done){
      request.post({url:baseUrl+'/register',form:{"email":"calvintey@fresnooo.com","password":"password","firstname":"One",
                                                  "lastname":"two","cell":"1234567899"}},
        function(error,response,body){
          expect(response.statusCode).to.equal(200);
          var bodyObj = JSON.parse(body);
          expect(bodyObj).to.have.property('message');
          expect(bodyObj).to.have.property('result').eql(true);
          done();
        });
      });
  });

  describe('order',function(){
    it('order success',function(done){
      request.post({url:baseUrl+'/order',form:{
    "name": "MyName",
    "cell": "5512345599",
    "location": "Dining Hall"
}},
        function(error,response,body){
          // expect(response.statusCode).to.equal(400);
          var bodyObj = JSON.parse(body);
          bodyObj.should.have.property('message').eql("Order is being processed!");
          // bodyObj.should.have.property("result").eql(true);
          expect(response.statusCode).to.equal(200);
          done();
        });
      });

    it('order failed',function(done){
          request.post({url:baseUrl+'/order',form:{
        "cell": "5512345599",
        "location": "Dining Hall"
    }},
            function(error,response,body){
              // expect(response.statusCode).to.equal(400);
              var bodyObj = JSON.parse(body);
              bodyObj.should.have.property('message').eql("Failed to save order");
              bodyObj.should.have.property("result").eql(false);
              expect(response.statusCode).to.equal(400);
              done();
            });
          });
});

// describe('order',function(){
//   it('order success',function(done){
//     request.post({url:baseUrl+'/order',form:{
//   "name": "MyName",
//   "cell": "5512345599",
//   "location": "Dining Hall"
// }},
//       function(error,response,body){
//         // expect(response.statusCode).to.equal(400);
//         var bodyObj = JSON.parse(body);
//         bodyObj.should.have.property('message').eql("Order is being processed!");
//         // bodyObj.should.have.property("result").eql(true);
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });
//   });
