const cloud = require('wx-server-sdk');
const respModal = require('../modal/respModal')


cloud.init({
  env: 'testcloud-9ge0igqb96370aba'
});
const db = cloud.database()
const teachers = db.collection('teachers')
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  // const wxContext = cloud.getWXContext();
  const {teacherId} = event
  try{
    const res = await teachers.doc(teacherId).remove()
 
    return respModal.success(res.data)
  }catch(e){
    return respModal.error()
  }
};
