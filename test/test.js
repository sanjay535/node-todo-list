process.env.NODE_ENV = "test";


let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../testserver");
let should = chai.should();
let expect = chai.expect();
let request = require("supertest");

chai.use(chaiHttp);

describe("Testing APIS", () => {
  /*
   * Test the /GET route
   */
  describe("Test suite", () => {

    var _id="";

    it("it should create Task", function (done) {

      var data={
        name: Math.random().toString(36).substring(7)
      }

      request(server)
        .post("/tasks")
        .send(data)
        .set("Accept", "application/json")
        .expect(function (res) {
          //console.log(res);
        })
        .expect(200)
        .then((response) => {
          console.log(response.body)
          response.body.should.be.an("object");
          response.body.should.have.property("name")
          response.body.should.have.property("status")
          _id=response.body["_id"];
          done();
        })
        .catch((err) => {
          console.log(err);
          done(new Error(err));
        });
    });

    it("it should test get tasks API", function (done) {
      request(server)
        .get("/tasks")
        .set("Accept", "application/json")
        .expect(function (res) {})
        .expect(200)
        .then((response) => {
          response.body.should.be.an("array");
          response.body[0].should.have.property("name")
          done();
        })
        .catch((err) => {
          console.log(err);
          done(new Error(err));
        });
    });

    it("it should test get specific tasks API", function (done) {
      request(server)
        .get("/tasks/"+_id)
        .set("Accept", "application/json")
        .expect(function (res) {})
        .expect(200)
        .then((response) => {
          response.body.should.be.an("object");
          response.body.should.have.property("name")
          done();
        })
        .catch((err) => {
          console.log(err);
          done(new Error(err));
        });
    });




  });
});
