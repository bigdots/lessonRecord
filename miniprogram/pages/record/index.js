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
    queryData:{
      date: Date.parse(today),
      studentId: '',
      hours: 2,
      teacherId:''
    },
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
      queryData: {
        ...this.data.queryData,
        hours: this.data.picker[e.detail.value]
      }
    })
  },
  DateChange(e) {
    console.log(e)
    const val = e.detail.value
    this.setData({
      date: val,
      queryData:{
        ...this.data.queryData,
        date: Date.parse(val)
      }
    })
    // console.log(this.data.queryData)
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
    const h = this.data.queryData.hours
    if(type=='add'){
      this.setData({
        queryData:{
          ...this.data.queryData,
          hours: h+0.5
        }
      })
    }else if(type=='sub'){
      const r = h-0.5
      this.setData({
        queryData:{
          ...this.data.queryData,
          hours: r >0 ? r : 0
        }
      })
    }
  },
  
  onLoad: function () {
  },

  async addRecord(){
    const resp = await request('addlesson',this.data.queryData)
  
    if(resp.succeed){
      // this.setData({
      //   studentList: resp.data
      // })
    }
  },
  handleSchange(e){
    console.log(90,e)
    const {_id,value} = e.detail
    this.setData({
      queryData:{
        ...this.data.queryData,
        studentId: _id
      }
    })
  },
  handleTchange(e){
    const {_id,value} = e.detail
    this.setData({
      queryData:{
        ...this.data.queryData,
        teacherId: _id
      }
    })
  },

  recordTap(){
    this.addRecord()
  }
})
