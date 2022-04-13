const respModal = require('../modal/respModal')

// 获取openId云函数入口函数
module.exports = async (event, context,students)=> {
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
