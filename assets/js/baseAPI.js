//注意:每次调用$.get()或$.post()或$.ajax()的时候,先调用ajaxPrefilter这个函数
//这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    //在发起正真的ajax请求之前,统一拼接请求的根路径
//    options.url = 'http://www.liulongbin.top:3007' + options.url
    options.url = 'http://192.168.2.166:3007' + options.url

    console.log(options.url);

    //统一有限的接口,设置headers请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一载conplete回调函数
    options.complete = function (res) {
        // console.log('执行了complete回调');
        // console.log(res);
        //在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }

    options.error = function(XMLHttpRequest, textStatus, errorThrown){
        debugger
        // 状态码
        console.log(XMLHttpRequest.status);
        // 状态
        console.log(XMLHttpRequest.readyState);
        // 错误信息
        console.log(textStatus);
        __hideLoading();
        
        // if(XMLHttpRequest.readyState==0){
        //     // 对应登录超时问题，直接跳到登录页面
        //     location.href='../Login.action';
        // }else{
        //     $.messager.alert('提示','系统内部错误，请联系管理员处理！','info');
        // }

    }
})