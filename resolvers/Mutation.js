const createStudent = require('./mutations/createStudent')
const updateStudent = require('./mutations/updateStudent')
const deleteStudent = require('./mutations/deleteStudent')



const Mutation = {

    createStudent,
    updateStudent,
    deleteStudent,

}

module.exports = Mutation