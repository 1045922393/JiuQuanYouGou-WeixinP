// pages/index/index.js
import {request} from "../../request/request"
Page({
    data:{
        swiperPicList:[],
        navList:[],
        floorList:[]
    },
    onLoad(){
        // console.log(111)
        // /home/catitems
        // /home/floordata
        request({url:"/home/swiperdata"})
        .then(res=>{
            this.setData({
                swiperPicList:res.data.message
            })
        })
        request({url:"/home/catitems"})
        .then(res=>{
            this.setData({
                navList:res.data.message
            })
        })
        request({url:"/home/floordata"})
        .then(res=>{
            // console.log(res.data.message)
            this.setData({
                floorList:res.data.message
            })
        })
    }
})