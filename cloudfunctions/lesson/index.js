const studentF = require("./students/index");
const teacherF = require("./teachers/index");
const lessonF = require("./lessons/index");

const { cloud } = require("./basic");
const wxContext = cloud.getWXContext();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  context = Object.assign(context, wxContext);
  switch (event.type) {
    case "addTeacher":
      return await teacherF.set(event, context);
    case "deleteTeacher":
      return await teacherF.delete(event, context);
    case "getTeacher":
      return await teacherF.get(event, context);
    case "updateTeacher":
      return await teacherF.update(event, context);
    case "addStudents":
      return await studentF.set(event, context);
    case "getStudents":
      return await studentF.get(event, context);
    case "deleteStudent":
      return await studentF.del(event, context);
    case "updateStudent":
      return await studentF.update(event, context);
    case "addlesson":
      return await lessonF.set(event, context);
    case "deleteLesson":
      return await lessonF.delete(event, context);
    case "getLessons":
      return await lessonF.get(event, context);
    default:
      return {};
  }
};
