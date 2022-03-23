//index.js
//获取应用实例
const app = getApp()
import request from '../../request/index'
Page({
  data: {
    teacherName: '',
    subject: '',
    envId:'testcloud-9ge0igqb96370aba'
  },
  async getUserProfile(){
    const res = await wx.getUserProfile({
      desc: '用于完善会员资料'
    })
    console.log(res)
    wx.setStorageSync('userInfo', res.userInfo)
  },
   handleTap(){
    request('addTeacher',{
      teacherName: this.data.teacherName,
      subject: this.data.subject
    }).then((resp) => {
      console.log('login',resp)
      wx.navigateTo({
        url: '/pages/index/index'
      })
   })
  },
  onLoad(){
    // request('isregister').then((res)=>{
    //   if(res.length){
    //     wx.navigateTo({
    //       url: '/pages/index/index'
    //     })
    //   }
    //   console.log(9090,res)
    // })
  }
})
