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
  const {studentName,price} = event
  try{
    const addres = await students.add({
      data: {
        studentName,
        price
      },
    })
  
    return respModal.success(addres.data)
    
  }catch(e){
    return respModal.error()
  }
};
