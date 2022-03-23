const cloud = require('wx-server-sdk');

cloud.init({
  env: 'testcloud-9ge0igqb96370aba'
});
const db = cloud.database()
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();

  const teachers = db.collection('teachers')
  const {teacherName,subject} = event
  try{
    const addres = await teachers.add({
      data: {
        teacherName,
        subject
      },
    })
    return addres
    
  }catch(e){

  }
};
