const cloud = require('wx-server-sdk');
const respModal = require('../modal/respModal')

cloud.init({
  env: 'testcloud-9ge0igqb96370aba'
});
const db = cloud.database()
const lessons = db.collection('lessons')

const _ = db.command
const $ = _.aggregate
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  // const wxContext = cloud.getWXContext();
  const {dateStart,dateEnd,studentId,teacherId} = event
  
  const query = {}
  // console.log()
  if(dateStart && dateEnd) {
    // query.date = _.gte(parseInt(dateStart)).and(_.lte(parseInt(dateEnd)));
  }
  if(studentId) query.studentId = studentId;
  if(teacherId) query.teacherId = teacherId;
  console.log('query',query)
  try{
    const lessonsRes = await lessons.aggregate()
    .match(query)
    .lookup({
      from: 'teachers',
      localField: 'teacherId',
      foreignField: '_id',
      as: 'teacherList'
    })
    .lookup({
      from: 'students',
      localField: 'studentId',
      foreignField: '_id',
      as: 'studentsList',
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$teacherList',0]),$.arrayElemAt(['$studentsList',0]),'$$ROOT'])
    })
    .project({
      studentsList: 0,
      teacherList: 0
    })
    .end()
    return respModal.success(lessonsRes.list)
  }catch(e){
    console.error('error',e)
    return respModal.error()
  }
};
