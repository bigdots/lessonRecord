//index.js
//获取应用实例
const app = getApp();
import request from "../../request/index";
import { formatDate } from "../../utils/util";

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
    dataList: [],
    totalhours: 0,
    totalMoney: 0,
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
    });
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection:
        e.touches[0].pageX - this.data.ListTouchStart > 0 ? "right" : "left",
    });
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == "left") {
      this.setData({
        modalName: e.currentTarget.dataset.target,
      });
    } else {
      this.setData({
        modalName: null,
      });
    }
    this.setData({
      ListTouchDirection: null,
    });
  },
  onLoad: async function (options) {
    console.log(options);
    // const {query} = options
    const resp = await request("getLessons", options);
    if (resp.succeed) {
      let totalhours = 0;
      let totalMoney = 0;
      const dataList = resp.data.map((item, index) => {
        const t = { ...item };
        t.date = formatDate(t.date);
        console.log(item.hours * parseInt(item.price));
        totalhours += item.hours;
        totalMoney += item.hours * parseInt(item.price);
        return t;
      });
      this.setData({
        dataList,
        totalMoney,
        totalhours
      });
    }
  },
});
