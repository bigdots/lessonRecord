// const cloud = require('wx-server-sdk');
const respModal = require('../modal/respModal')

// cloud.init({
//   env: 'testcloud-9ge0igqb96370aba'
// });
// const db = cloud.database()
// const lessons = db.collection('lessons')
// 获取openId云函数入口函数
module.exports = async (event, context,lessons)=> {
  // 获取基础信息
  // const wxContext = cloud.getWXContext();
  const {lessonId} = event
  try{
    const res = await lessons.doc(lessonId).remove()
    // console.log('098',stures)
    return respModal.success(res.data)
  }catch(e){
    return respModal.error()
  }
};
