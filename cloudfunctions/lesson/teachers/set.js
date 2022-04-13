
// 获取openId云函数入口函数
module.exports = async (event, context,teachers)=> {
  // 获取基础信息

  const {teacherName,subject} = event
  try{
    const addres = await teachers.add({
      data: {
        teacherName,
        subject,
        _openid:context.OPENID
      },
    })
    return addres
    
  }catch(e){

  }
};
