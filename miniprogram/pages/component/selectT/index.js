const app = getApp();
import request from '../../../request/index'
Component({
    options:{
      addGlobalClass: true
    },
    data:{
      CustomBar: app.globalData.CustomBar,
      modalName: null,
      drawerModalName: null,
      dialogModalName: null,
      name: '',
      price: '',
      dataList: [],
      teacherName: '请选择',
      subject: '',
      unlimitVal: {
        teacherName: '不限',
        _id: '',
        subject: ''
      }
    },
    methods:{
      showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      },
      hideModal(e) {
        this.setData({
          modalName: null
        })
      },
      // ListTouch触摸开始
    ListTouchStart(e) {
      this.setData({
        ListTouchStart: e.touches[0].pageX
      })
    },
  
    // ListTouch计算方向
    ListTouchMove(e) {
      this.setData({
        ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
      })
    },
  
    // ListTouch计算滚动
    ListTouchEnd(e) {
      if (this.data.ListTouchDirection =='left'){
        this.setData({
          drawerModalName: e.currentTarget.dataset.target
        })
      } else {
        this.setData({
          drawerModalName: null
        })
      }
      this.setData({
        ListTouchDirection: null
      })
    },
    showDialogModal(e) {
      this.setData({
        dialogModalName: 'DialogModal1'
      })
      
    },
    hidediaologModal(e) {
        this.setData({
          dialogModalName: null
        })
        
    },
    cancelTap(){
      this.hidediaologModal()
    },
    sureTap(){
      const {teacherName,subject} = this.data
      if(teacherName == '' || subject == ''){
        wx.showToast({
          title: '请将内容填写完整',
          icon: 'none'
        })
        return;
      }
      request('addTeacher',{
        teacherName,
        subject
      }).then((resp) => {
        this.getTeachers()
        this.hidediaologModal()
     })
    },
    handleItemtap(e){
      console.log(678,e)
    },
    handleAdd(){
      this.showDialogModal()
    },
    // handleSelStu(e){
    //   console.log(e)
    //   const {value,target} = e.currentTarget.dataset;
     
    //   this.hideModal()
    //   this.setData({
    //     teacherName:value.teacherName,
    //   })
    //   this.triggerEvent('change',value)
    // },
    handleTapItem(e) {
      console.log(e);
      const { value } = e.currentTarget.dataset;
      const { type } = e.target.dataset;
      console.error(type)
      if (type == "select") {
        // console.log(333)
       this.selectStu(value)
      }
      if(type == "delete"){
        this.deleteStu(value._id)
      }
    },
    selectStu(value){
      this.hideModal();
      this.setData({
        teacherName: value.teacherName,
      });
      this.triggerEvent("change", value);
    },
    async deleteStu(teacherId) {
      let resp = await request("deleteTeacher",{
        teacherId
      });
      if (resp.succeed) {
        // this.data.dataList.splice()
        wx.showToast({
          title: "删除成功",
        });
        this.getTeachers();
      }
    },
    async getTeachers(){
      let resp = await request('getTeacher')
      if(resp.succeed){
        this.setData({
          dataList: resp.data
        })
      }
    },
  },
  lifetimes:{
    attached:function(){
      this.getTeachers()
      // console.log('999',this.properties)
    },
  }
})