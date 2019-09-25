// pages/goods_list/index.js
import {request} from "../../request/request"

Page({
  data: {
    topTab: [
      {
        id: 0,
        name: '综合'
      }, {
        id: 1,
        name: '销量'
      }, {
        id: 2,
        name: '价格'
      },
    ],
    tabIndex: 0,
    goodsList:[]
  },
  //  搜索的提交参数
  searchParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  goodsTotal:0,
  toggleTab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
// 组件加载完成
  onLoad(option){
    this.searchParams.cid=option.cid
    this.getList()
  },
  getList(){
    request({
      url:"/goods/search",
      data:this.searchParams
    }).then(res=>{
      this.setData({
        goodsList:res.data.message.goods
      })
      this.goodsTotal=res.data.message.total
    })
  }
})