import chai from 'chai';
import connection from '../services/db';

import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'

const expect = chai.expect;

describe('loginFunction()', function () {
  it('Test login', async function  () {
    await connection.initialzeDb()
    const loginResponse = await loginFunction("admin", "secret")
    expect("eyJhbGciOiJIUzI1NiJ9.YWRtaW4.jxjAJS_99b0l_21irrGWUOw_6RQsYqy1cT3DoIHil44").to.be.equal(loginResponse.data);
  });

  it('Test login wrong username error', async function  () {
    await connection.initialzeDb()
    const loginResponse = await loginFunction("admin123", "secret")
    expect(loginResponse.data).to.be.equal('Error user not found');
  });

  it('Test login wrong password error', async function  () {
    await connection.initialzeDb()
    const loginResponse = await loginFunction("admin", "secret123")
    expect(loginResponse.data).to.be.equal('Error password not valid');
  });
});

describe('protectFunction()', function () {
  it('Test protected', async function () {
    await connection.initialzeDb()
    const protectResponse = await protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI")
    expect("You are under protected data").to.be.equal(protectResponse.data);
  });

  it('Test protected wrong token', async function () {
    await connection.initialzeDb()
    const protectResponse = await protectFunction("123")
    expect(protectResponse.data).to.be.equal("Error token not valid");
  });
});
