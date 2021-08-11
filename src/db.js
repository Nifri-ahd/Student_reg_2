const dotenv = require('dotenv');
const { Prisma } = require('prisma-binding');

dotenv.config();

const stuDB = new Prisma({
    typeDefs: './index.js',
    endpoint: process.env.ENDPOINT,
    debug: false
});

module.exports = stuDB;