const app = getApp();
import request from '../../query/index'
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
      price: ''
    },
    properties:{
      dataList: {
        type: Array,
        value: []
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
      request('addStudents',{
        name: this.data.name,
        subject: this.data.price
      }).then((resp) => {
          console.log('addstu',resp)
          this.hidediaologModal()
      })
    },
    handleAdd(){
      this.showDialogModal()
    },
  },
  lifetimes:{
    attached:function(){
      console.log('999',this.properties)
    },
  }
    
})