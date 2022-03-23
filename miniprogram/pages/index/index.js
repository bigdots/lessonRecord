//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: "Hi~",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    date: "2018-12-25",
    modalName: null,
  },
  DateChange(e) {
    console.log(e);
    this.setData({
      date: e.detail.value,
    });
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },

  onLoad: function () {},
});
