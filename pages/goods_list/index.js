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
  // goods的总数
  goodsTotal:0,
  // 切换最上面的tab栏
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
  // 从后台拉取数据并修改变量
  getList(){
    request({
      url:"/goods/search",
      data:this.searchParams
    }).then(res=>{
      this.setData({
        goodsList:res.data.message.goods
      })
      this.goodsTotal=res.data.message.total
      wx.stopPullDownRefresh()
    })
  },
  // 上拉钩子
  onReachBottom(){
    this.searchParams.pagenum++;
    let oldList=this.data.goodsList
    wx.pageScrollTo({
      selector:".turnTo",
      duration:1000
    })
    if(oldList.length===this.goodsTotal){
      wx.showToast({
        title: '已全部加载',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    request({
      url:"/goods/search",
      data:this.searchParams
    }).then(res=>{
      this.setData({
        goodsList:[...oldList,...res.data.message.goods]
      })
      this.goodsTotal=res.data.message.total
    })
  },
  // 下拉钩子
  onPullDownRefresh(){
    this.searchParams.pagenum=1;
    this.getList();
  }
})