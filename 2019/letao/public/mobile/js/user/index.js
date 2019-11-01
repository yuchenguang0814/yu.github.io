$(function(){
    var params ={'url':'/API/getUser.php','type':'get','success':function(data){
                 var mobile = data.data.mobile||'暂无';
                  $('.mui-media-body').html(data.data.username+'<p class="mui-ellipsis">绑定手机:'+data.data.mobile+'</p>');
                }};
    window.LT.loginAjax(params);
    $('body').on('tap','.btn_outLogin',function(){
        mui.confirm('提示', '确认退出', ['是', '否'],  function(e) {
            if (e.index == 0) {
                getLoginOutData(function(data){
                    if(data.sussce){
                        location.href = window.LT.loginUrl;
                    }
                });
            } else {
                //TODO
            }
        });
    });
});
var getLoginOutData = function(callback){
    $.ajax({
        type:'get',
        url:'/API/logout.php',
        data:'',
        dataType:'json',
        beforeSend:function(){
            $('.btn_login').html('正在退出...');
        },
        success:function(data){
            callback && callback(data);
        }
    });
};

