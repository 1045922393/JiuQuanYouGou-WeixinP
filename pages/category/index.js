// pages/category/index.js
import { request } from "../../request/request"
Page({
  data: {
    leftNav: [],
    rightChildren: [],
    currentIndex: 0,
    scrollPosition: 0
  },
  Catch: [],//直接在在page下设置属性
  onLoad() {
    // let data={value:111}
    // wx.setStorageSync("YouGou",data)
    // console.log(wx.getStorageSync("YouGou"))
    let storage = wx.getStorageSync("YouGou")
    if (!storage) {
      this.getCatchFromRemote()
    } else {
      let time = Date.now() - storage.time
      if (time > 60000) {
        this.getCatchFromRemote()
      } else {
        this.Catch = storage.data
        this.setData({
          leftNav: this.Catch.map(item => { return { cat_name: item.cat_name } }),
          rightChildren: this.Catch.map(item => { return item.children })[0]
        })
      }
    }
  },
  handleTap(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index,
      rightChildren: this.Catch.map(item => { return item.children })[index],
      scrollPosition: 0
    })
  },
  //封装远程拉取数据
  getCatchFromRemote() {
    request({
      url: '/categories'
    }).then(res => {
      wx.setStorageSync("YouGou", { time: Date.now(), data: res.data.message })
      this.Catch = res.data.message;
      this.setData({
        leftNav: this.Catch.map(item => { return { cat_name: item.cat_name } }),
        rightChildren: this.Catch.map(item => { return item.children })[0]
      })
    })
  }
})