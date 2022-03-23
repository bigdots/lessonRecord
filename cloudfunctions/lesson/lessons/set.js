const cloud = require('wx-server-sdk');
const respModal = require('../modal/respModal')

cloud.init({
  env: 'testcloud-9ge0igqb96370aba'
});
const db = cloud.database()
const lessons = db.collection('lessons')
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  // const wxContext = cloud.getWXContext();
  const {date,studentId,hours,teacherId} = event
  try{
    const lessonsRes = await lessons.add({
      data: {
        date,
        studentId,
        hours,
        teacherId
      },
    })
    
    console.log(lessonsRes)
  
    return respModal.success(lessonsRes._id)
    
  }catch(e){
    return respModal.error()
  }
};
