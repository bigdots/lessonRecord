



module.exports = async (event, context,students) => {
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
