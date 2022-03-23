const cloud = require('wx-server-sdk');
const respModal = require('../modal/respModal')


cloud.init({
  env: 'testcloud-9ge0igqb96370aba'
});
const db = cloud.database()
const students = db.collection('students')
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  const {studentId} = event
  const query = {}
  if(studentId) query._id = studentId
  try{
    const stures = await students.where(query).get()
    // console.log('098',stures)
    return respModal.success(stures.data)
  }catch(e){
    return respModal.error()
  }
};
