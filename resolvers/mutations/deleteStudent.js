const bcrypt = require('bcryptjs');
const { UserInputError, ApolloError } = require('apollo-server');
const prismaClient = require('@prisma/client').PrismaClient;
const path = require("path");


const deleteStudent = {
    resolve: async (parent, args, ctx, info) => { 

        let data;

        try {

            data = await ctx.stuDB.mutation.deleteStudent(
                {
                    where: {
                        id: args.where.id
                    },
                    data: {
                        isActive:false
                    }
                },
                info
            )

            
            return data  
            
        } catch (error) {
          
            return new Error(error);
        }

    }
    
}

module.exports = deleteStudent