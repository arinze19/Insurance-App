import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index';

const server = supertest(app);

describe('Test routes relating to Policy', () => {
  it('gets a list of users with policy status of ACTIVE or PENDING', (done) => {
    server.get('/policies').end((err, res) => {
      if (err) {
        done(err);
      }

      expect(res.status).to.equal(200);

      done();
    });
  });

  it('returns specified number of resources', (done) => {
    const limit = 3;
    server.get(`/policies?limit=${limit}`).end((err, res) => {
      if (err) {
        done(err);
      }

      expect(res.body).to.have.length(limit);

      done();
    });
  });

  it('make search queries case insensitive', (done) => {
    const query = 'barmer'; // testing for name of insurance provider

    server.get(`/policies?search=${query}`).end((err, res) => {
      if (err) {
        done(err);
      }

      expect(res.status).to.equal(200);
      expect(res.body).to.not.have.length(0);

      done();
    });
  });
});
