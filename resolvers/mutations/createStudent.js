const bcrypt = require('bcryptjs');
const { UserInputError, ApolloError } = require('apollo-server');
const prismaClient = require('@prisma/client').PrismaClient;
const path = require("path");

const prisma = new prismaClient();
const files  = [];
module.exports = {

  Mutation: {
    async login(_, { username, password }) {
    let valid = true;
    
    if (!valid) {
    throw new UserInputError('Errors', { errors });
    }

    const Student = await prisma.stuDB.findFirst({
        where:{
            username:username},
    });
    if (!Student) {
        throw new UserInputError('User not found', { errors });
    }

    const password_match = await bcrypt.compare(password, Student.password)
    if(!password_match){
        throw new UserInputError('Incorrect Password', { errors });
    }
    return Student;
    },
    async register(
      _,{StudentData: 
        { firstname,lastname,username, email,age,country, password }
    }) {
        let Student;
        let valid = true;
        // fetch if the user already exist
        try {
            Student = await prisma.stuDB.findFirst({
                where:{
                    username:username},
            });
        }
        catch(err){
            throw new ApolloError("failed while fetching if existant user")
        }
        if(Student){
            //if user is found with the same username 
            valid=false;
        }
        if(valid){
            password = await bcrypt.hash(password, 10);
        }else{
            throw new UserInputError('Username is not available', { errors })
        }
        try{
            const Student = await prisma.stuDB.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    age: age,
                    country: country,
                    password: password,
                    
                }
                
            });
            return Student;
        }catch(err){
            new ApolloError("Failed to Register the User",{err});
        }
    },

  }
}
module.exports = createStudent