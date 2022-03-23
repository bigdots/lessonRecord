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
      teacherName: '请选择'
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
    // sureTap(){   
    //   request('')
    //   wx.cloud.callFunction({
    //       name: 'lesson',
    //       config: {
    //         env: this.data.envId
    //       },
    //       data: {
    //         type: 'addStudents',
    //         name: this.data.name,
    //         price: this.data.price
    //       }
    //     }).then((resp) => {
    //       console.log('addstu',resp)
    //       this.hidediaologModal()
    //   })
    // },
    handleAdd(){
      this.showDialogModal()
    },
    handleSelStu(e){
      console.log(e)
      const val = e.currentTarget.dataset.value
      this.hideModal()
      this.setData({
        teacherName: val.teacherName
      })
      this.triggerEvent('change',val)
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