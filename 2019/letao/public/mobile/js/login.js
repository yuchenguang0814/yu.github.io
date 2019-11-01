$(function(){
    $('.btn_login').on('tap',function (){
        var data = $('form').serialize();
        var dataObject = window.LT.serializeToobejct(data);
        console.log(dataObject);
        if(!dataObject.username){
            mui.toast('请您输入用户名');
            return false;
        }
        if(!dataObject.password){
            mui.toast('请您输入密码');
            return false;
        }
        var params ={'url':'/API/login.php','type':'post','data':dataObject,'success':function(data){
                if(data.success==true){
                     var returnUrl = window.LT.getUrlParam('returnUrl');
                     if(returnUrl){
                        location.href = returnUrl;
                     }else{
                        location.href = window.LT.indexUrl;
                     }
                }else{
                     mui.toast(data.messeage);
                }

        }
        };
        window.LT.Ajax(params);

    });
});
