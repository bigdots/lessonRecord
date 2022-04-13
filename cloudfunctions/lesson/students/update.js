// db.collection('todos').doc('todo-identifiant-aleatoire').update({
//     // data 传入需要局部更新的数据
//     data: {
//       // 表示将 done 字段置为 true
//       done: true
//     },
//     success: function(res) {
//       console.log(res.data)
//     }
//   })

module.exports = async (event, context, students) => {
  // 获取基础信息
  // const wxContext = cloud.getWXContext();
  const { studentId, studentName, price } = event;
  try {
    const res = await students.doc(studentId).update({
      studentName,
      price,
    });
    return respModal.success(res.data);
  } catch (e) {
    return respModal.error();
  }
};
