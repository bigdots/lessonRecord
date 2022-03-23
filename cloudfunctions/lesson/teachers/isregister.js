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
  const wxContext = cloud.getWXContext();
  try{
    const teaRes = await teachers.doc( wxContext.OPENID).get()
    console.log('isreg',teaRes)
    return respModal.success(teaRes.data)
  }catch(e){
    return respModal.error()
  }
};
