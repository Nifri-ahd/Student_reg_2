const bcrypt = require('bcryptjs');
const { UserInputError, ApolloError } = require('apollo-server');
const prismaClient = require('@prisma/client').PrismaClient;
const path = require("path");

const prisma = new prismaClient();
const files  = [];
module.exports = {
  Query: {
        async files(){
            return files
        },
        async getStudent(_,{username}) {
          try {
            const Student = await prisma.stuDB.findFirst({
                where:{
                    username:username},
            });
            return Student;
          } catch (err) {
            new ApolloError("Failed to fetch the User",{err});
          }
        },
        async getAllStudent(){
            try{
                const Students = await prisma.stuDB.findMany();
                return Students;
            }catch(err){
                new ApolloError("Failed to fetch all the Users",{err});
            }
        }
    }
}