

module.exports = async (event, context, teachers) => {
    // 获取基础信息
    // const wxContext = cloud.getWXContext();
    const { teacherId, teacherName, subject } = event;
    try {
      const res = await teachers.doc(teacherId).update({
        teacherName,
        subject,
      });
      return respModal.success(res.data);
    } catch (e) {
      return respModal.error();
    }
  };