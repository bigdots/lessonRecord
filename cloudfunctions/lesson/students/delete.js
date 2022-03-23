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
  // const wxContext = cloud.getWXContext();
  const {studentId} = event
  try{
    const res = await students.doc(studentId).remove()
 
    return respModal.success(res.data)
  }catch(e){
    return respModal.error()
  }
};
