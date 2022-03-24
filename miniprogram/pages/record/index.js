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
    date: today,
    studentId: '',
    hours: 2,
    teacherId:'',
    studentList: [{
      name: '123',
      _id: 56
    }],
    // studentName: '请选择',
    modalName: null,
    picker: ['1', '1.5', '2','2.5','3'],
  },
  
  PickerChange(e){
    console.log(e)
    this.setData({
      hours: this.data.picker[e.detail.value]
    })
  },
  DateChange(e) {
    console.log(e)
    const val = e.detail.value
    this.setData({
      date: val,
      // date: Date.parse(val)
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
  
  ChooseCheckbox(e) {
    let items = this.data.studentList;
    let values = e.currentTarget.dataset._id;
    // console.log(_id)
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i]._id == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    
    this.setData({
      studentList: items
    })
  },

  hourstap(e){
    console.log(e)
    const type  = e.target.dataset.type
    const h = this.data.hours
    if(type=='add'){
      
      this.setData({
        hours: h+0.5
      })
    }else if(type=='sub'){
      const r = h-0.5
      this.setData({
        hours: r >0 ? r : 0
      })
    }
  },
  
  onLoad: function () {
  },

  async addRecord(){
    const {date,
      studentId,
      hours,
      teacherId} = this.data
      if(date=='' || studentId=='' || hours=='' || teacherId==''){
        wx.showToast({
          title: '请将内容填写完整',
          icon: 'none'
        })
        return;
      }
    const resp = await request('addlesson',{
      date: Date.parse(date),
      studentId,
      hours,
      teacherId,
    })
  
    if(resp.succeed){
      wx.showToast({
        title: '操作成功',
      })
      // this.setData({
      //   date: today,
      //   studentId: '',
      //   hours: 2,
      //   teacherId:'',
      // })
    }
  },
  handleSchange(e){
    console.log(90,e)
    const {_id,value} = e.detail
    this.setData({
      studentId: _id
    })
  },
  handleTchange(e){
    const {_id,value} = e.detail
    this.setData({
      teacherId: _id
    })
  },

  recordTap(){
    this.addRecord()
  }
})
