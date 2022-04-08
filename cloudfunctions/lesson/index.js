
const addStudents = require('./students/set')
const getStudents = require('./students/get')
const deleteStudent = require('./students/delete')

const addTeacher = require('./teachers/set')
const isregister = require('./teachers/isregister')
const getTeacher = require('./teachers/get')
const deleteTeacher = require('./teachers/delete')

const getLessons = require('./lessons/get')
const addlesson = require('./lessons/set')
const deleteLesson = require('./lessons/delete')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addTeacher':
      return await addTeacher.main(event, context)
    case 'addStudents':
      return await addStudents.main(event, context)
    case 'getStudents':
      return await getStudents.main(event, context)
    case 'addlesson':
      return await addlesson.main(event, context)
    case 'isregister':
      return await isregister.main(event,context)
    case 'getTeacher':
      return await getTeacher.main(event,context)
    case 'deleteLesson':
      return await deleteLesson.main(event,context)
    case 'deleteStudent':
      return await deleteStudent.main(event,context)
    case 'getLessons':
      return await getLessons.main(event,context)
    case 'deleteTeacher':
      return await deleteTeacher.main(event,context)
    default:
      return {}
  }
};
