const regeneratorRuntime = require("regenerator-runtime/runtime");

const mysql = require('mysql2/promise');
var pool;

const initialzeDb = async () => {
    pool = await mysql.createPool({
        host: 'sre-bootcamp-selection-challenge.cabf3yhjqvmq.us-east-1.rds.amazonaws.com',
        user: 'secret',
        password: 'jOdznoyH6swQB9sTGdLUeeSrtejWkcw',
        database: 'bootcamp_tht'
    });
}

const getConnection = async () => {
    const connection = await pool.getConnection();
    return connection;
};


module.exports = {initialzeDb, getConnection};
