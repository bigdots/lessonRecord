Page({
    data:{
        name: '',
        price: ''
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
    cancelTap(){
        this.hideModal()
    },
    sureTap(){   
        wx.cloud.callFunction({
            name: 'lesson',
            config: {
              env: this.data.envId
            },
            data: {
              type: 'addStudents',
              name: this.data.name,
              subject: this.data.price
            }
          }).then((resp) => {
            console.log('addstu',resp)
            this.hideModal()
        })
    }
})