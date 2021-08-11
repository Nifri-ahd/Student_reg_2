const bcrypt = require('bcryptjs');
const { UserInputError, ApolloError } = require('apollo-server');
const prismaClient = require('@prisma/client').PrismaClient;
const path = require("path");


const updateStudent = {
    resolve: async (parent, args, ctx, info) => { 
        let data;

        try {

            data = await ctx.stuDB.mutation.updateStudent(
                {
                    where: {
                        id: args.where.id
                    }
                    , data: {
                        ...args.data
                    }
                },
                info
            )

            
            return data ; 
            
        } catch (error) {
        return new Error(error);
        }

    }
    
}

module.exports = updateStudent;