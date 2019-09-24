// pages/category/index.js
import {request} from "../../request/request"
Page({
  data:{
    leftNav:[],
    rightChildren:[],
    currentIndex:0,
    scrollPosition:0
  },
  Catch:[],//直接在在page下设置属性
  onLoad(){
    request({
      url:'/categories'
    }).then(res=>{
      this.Catch=res.data.message;
      this.setData({
        leftNav:this.Catch.map(item=>{return {cat_name:item.cat_name}}),
        rightChildren:this.Catch.map(item=>{return item.children})[0]
      })
    })
  },
  handleTap(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex:index,
      rightChildren:this.Catch.map(item=>{return item.children})[index],
      scrollPosition:0
    })
  }
})