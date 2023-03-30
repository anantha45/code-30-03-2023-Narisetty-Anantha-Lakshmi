const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../index")
chai.use(chaiHttp);

describe('Get BMI report along with default category count', () => {
  it('should return a 200 status code', (done) => {
    chai
      .request(server)
      .get('/getBMI')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Get BMI report along with given category count', () => {
    it('should return a 200 status code', (done) => {
      chai
        .request(server)
        .get('/getBMI?category=Normal weight')
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          done();
        });
    });
  });
