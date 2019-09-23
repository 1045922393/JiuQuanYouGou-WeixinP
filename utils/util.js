import "https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"
function request(params){
    const baseURL="http://baidu/"
    return new Promise((resolve,reject)=>{
        $.ajax({
            ...params,
            url:baseURL+params.url,         //加上默认值,相同属性后面覆盖前面
            method:params.method||"get",    //设置默认值
            success(res){
                resolve(res)
            },
            error(res){
                reject(res)
            }
        })
    })
}
const wxRequest = (params) =>{
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success(result){
                resolve(result)
            },
            fail(err){
                reject(err)
            }
        })
    })
}
export {request,wxRequest}
