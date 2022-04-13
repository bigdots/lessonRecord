// const cloud = require('wx-server-sdk');
const respModal = require('../modal/respModal')

module.exports = async (event, context,students) => {
  // 获取基础信息
  // console.log(context)
  const {studentId} = event
  const query = {}
  if(studentId) query._id = studentId
  query._openid = context.OPENID
  console.log('099',query)
  try{
    const stures = await students.where(query).get()
    console.log('098',stures)
    return respModal.success(stures.data)
  }catch(e){
    console.log('100',e)
    return respModal.error()
  }
};
