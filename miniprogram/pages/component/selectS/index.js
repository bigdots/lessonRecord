const app = getApp();
import request from "../../../request/index";
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    modalName: null,
    drawerModalName: null,
    dialogModalName: null,
    studentName: "请选择",
    price: "",
    dataList: [],
    unlimitVal: {
      studentName: "不限",
      _id: "",
      price: "",
    },
    // studentName: "请选择",
  },

  methods: {
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
          drawerModalName: e.currentTarget.dataset.target,
        });
      } else {
        this.setData({
          drawerModalName: null,
        });
      }
      this.setData({
        ListTouchDirection: null,
      });
    },
    showDialogModal(e) {
      this.setData({
        dialogModalName: "DialogModal1",
      });
    },
    hidediaologModal(e) {
      this.setData({
        dialogModalName: null,
      });
    },
    cancelTap() {
      this.hidediaologModal();
    },
    sureTap() {
      const { studentName, price } = this.data;
      if (studentName == "" || price == "") {
        wx.showToast({
          title: "请将内容填写完整",
          icon: "none",
        });
        return;
      }

      request("addStudents", {
        studentName: studentName,
        price: price,
      }).then((resp) => {
        this.getStudents();
        this.hidediaologModal();
      });
    },
    handleAdd() {
      this.setData({
        studentName: "",
        price: "",
        dialogModalName: "DialogModal1",
      });
    },
    handleTapItem(e) {
      console.log(e);
      const { value } = e.currentTarget.dataset;
      const { type } = e.target.dataset;

      if (type == "delete") {
        this.deleteStu(value._id);
      } else if (type == "update") {
        this.setData({
          studentName: value.studentName,
          price: value.price,
          dialogModalName: "DialogModal1",
        });
      } else {
        console.log("select");
        this.selectStu(value);
      }
    },
    selectStu(value) {
      this.hideModal();
      this.setData({
        studentName: value.studentName,
      });
      this.triggerEvent("change", value);
    },
    async deleteStu(studentId) {
      let resp = await request("deleteStudent", {
        studentId,
      });
      if (resp.succeed) {
        // this.data.dataList.splice()
        wx.showToast({
          title: "删除成功",
        });
        this.getStudents();
      }
    },

    async updateStu(event) {
      const { studentId, studentName, price } = event;
      let resp = await request("updateStudent", {
        studentId,
        studentName,
        price,
      });
      if (resp.succeed) {
        // this.data.dataList.splice()
        wx.showToast({
          title: "更新成功",
        });
        this.getStudents();
      }
    },

    getStudents: async function () {
      let resp = await request("getStudents");
      if (resp.succeed) {
        this.setData({
          dataList: resp.data,
        });
      }
    },
  },
  lifetimes: {
    attached: function () {
      this.getStudents();
    },
  },
});
