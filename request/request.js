let count = 0;
export const request = (params) => {
    return new Promise((resolve, reject) => {
        let baseURL="https://api.zbztb.cn/api/public/v1"
        count++;
        wx.showLoading({
            title: '加载中',
            // 加个遮罩
            mask:true
          })
        wx.request({
            ...params,
            url:baseURL+params.url,
            success(res){
                resolve(res)
            },
            fail(err){
                reject(err)
            },
            complete(){
                count--;
                if(count===0){
                    wx.hideLoading()
                }
            }
        })
    })
}