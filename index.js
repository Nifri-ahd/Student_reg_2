const { GraphQLServer } = require('graphql-yoga')
const Mutation = require('./resolvers/mutations');
const Query = require('./resolvers/query');
const stuDB = require('./src/db');




// const typeDefs = `
//   type Query {
//     hello(name: String): String!
//   }
// `

function createServer() {
  return new GraphQLServer({
    typeDefs: './schema/typeDef',
    resolvers: {
      Mutation,
      Query,

    },
   
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: async req => ({
      ...req,
      stuDB,
    })
  });
}

const resolvers = {
  Query: {
    async files(){
        return files
    },
    async getStudent(_,{username}) {
      try {
        const Student = await prisma.Student.findFirst({
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
            const Student = await prisma.Student.findMany();
            return Student;
        }catch(err){
            new ApolloError("Failed to fetch all the Users",{err});
        }
    }
},
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is running on localhost:4000 🚀'))