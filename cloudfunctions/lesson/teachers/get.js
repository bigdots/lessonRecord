
const respModal = require('../modal/respModal')


// 获取openId云函数入口函数
module.exports = async (event, context,teachers) => {
  // 获取基础信息
  const {teacherId} = event
  const query = {}
  if(teacherId) query._id = teacherId
  query._openid = context.OPENID
  try{
    const teaRes = await teachers.where(query).get()
    return respModal.success(teaRes.data)
  }catch(e){
    return respModal.error()
  }
};
