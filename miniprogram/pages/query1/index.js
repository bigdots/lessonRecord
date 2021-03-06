//index.js
//获取应用实例
const app = getApp()
import request from '../../request/index'
const today = app.globalData.today;

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // motto: 'Hi~',
    dateStart: today,
    dateEnd: today,
    studentId: '',
    teacherId: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalName: null,
    index: null,
   
  },
  DateChange(e) {
    console.log(e)
    const type = e.currentTarget.dataset.type
    let key;
    if(type=="start"){
      key = 'dateStart'
    }
    if(type=="end"){
      key = 'dateEnd'
    }
    const val = e.detail.value
    this.setData({
      [key]: val,
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  async getUserProfile(){
    const res = await wx.getUserProfile({
      desc: '用于完善会员资料'
    })
    console.log(res)

    wx.setStorageSync('userInfo', res.userInfo)
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },
  handleQueryBtn(){
    let {dateStart,dateEnd,studentId,teacherId} = this.data
    dateStart = dateStart.replace(/-/g, '/')
    dateEnd = dateEnd.replace(/-/g, '/')
    // console.log(dateStart,Date.parse(dateStart))
    wx.navigateTo({
      url: `/pages/detail/index?dateStart=${Date.parse(dateStart)}&dateEnd=${Date.parse(dateEnd)}&studentId=${studentId}&teacherId=${teacherId}`,
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.studentList;
    let values = e.currentTarget.dataset.value;
    console.log(values)
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      studentList: items
    })
  },
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
  handleSchange(e){
    console.log(290,e)
    const {_id,value} = e.detail
    this.setData({
      studentId: _id
    
    })
  },
  handleTchange(e){
    console.log(190,e)
    const {_id,value} = e.detail
    this.setData({
      teacherId: _id
    })
  },
  onLoad () {
   
  },
  
})
