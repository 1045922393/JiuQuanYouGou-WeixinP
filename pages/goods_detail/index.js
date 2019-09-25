// pages/goods_detail/index.js
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 封装获取后台数据
   */
  getInfo(data) {
    request({
      url: '/goods/detail',
      data
    }).then(res => {
      this.setData({
        goodInfo: { ...res.data.message }
      })
      console.log(this.data.goodInfo)
    })
  },
  tapSwiper(e) {
    // 从图片数组中map返回一个新的数组
    let urls = this.data.goodInfo.pics.map(item => { return item.pics_big_url })
    // urls需要的是一个数组或者是字符串,current需要的是需要第一页显示的字符串图片
    wx.previewImage({
      urls,
      current: urls[e.currentTarget.dataset.index]
    })
  },
  // 添加购物车逻辑
  addInCart() {
    let { goods_id } = this.data.goodInfo;
    let number = 1;
    let arr=[]
    if(!wx.getStorageSync("JiuQuanCart")){
      let obj={ goods_id, number}
      arr.push(obj)
    }else{
      arr = wx.getStorageSync("JiuQuanCart");
      let index=arr.findIndex(item=>{return item.goods_id===goods_id})
      if(index===-1){
        let obj = {goods_id,number}
        arr.push(obj)
      }else{
        arr[index].number++;
      }
    }
    wx.setStorageSync('JiuQuanCart',arr)
  }
})