
export default async function (type,data={}){
  wx.showLoading({
    title: 'loading',
  })
  return wx.cloud.callFunction({
      name: 'lesson',
      config: {
        env: 'testcloud-9ge0igqb96370aba'
      },
      data: {
        type,
        ...data,
      }
    }).then((resp)=>{
      wx.hideLoading()
      console.log(type,resp)
      if(resp.result.succeed){
          return resp.result
      }else{
          return false
      }
  }).catch((e)=>{
    wx.hideLoading()
  })
}

 