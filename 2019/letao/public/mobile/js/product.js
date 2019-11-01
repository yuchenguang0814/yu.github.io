$(function(){
    var productId = window.LT.getUrlParam('productId');
    getProductData({'productId':productId},function(data){
         $('.mui-scroll').html(template('productTemplate',data));
             mui('.mui-scroll-wrapper').scroll({
                 indicators: false,
            });
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            $('.loading').remove();
            var number = parseInt($('.p_number').find('input').val());
            var maxNumber = parseInt($('.p_number').find('input').attr('data-max'));
            $('.mui-scroll').on('tap','.btn_size',function(){
                $(this).addClass("now").siblings().removeClass('now');
            }).on('tap','.jia',function(){
                if(number<maxNumber){
                    number++;
                 $(this).siblings('input').attr('value',number);
                }else if(number==maxNumber){
                     mui.toast('已达到最大库存');
                }
            }).on('tap','.jian',function(){
                if (number>0) {
                    number--;
                $(this).siblings('input').attr('value',number);
                };
            });
            $('.btn_addCart').on('tap',function(){
                var changeBtn = $('.btn_size.now');
                if(!changeBtn.length){
                    mui.toast('请选择尺码');
                    return false;
                }
                if(number==0){
                    mui.toast('请选择数量');
                    return false;
                }
                var size = changeBtn.attr('data-size');
                var params ={'url':'/API/addCart.php','type':'post','data':{'size':size,'number':number,'productId':productId},'success':function(data){
                    mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                            if (e.index == 0) {
                                location.href = LT.cartUrl;
                            } else {
                                //TODO
                            }
                         });
                    }
                };
                window.LT.loginAjax(params);
            });
    });
});
var getProductData = function(params,callback){
    $.ajax({
        url: '/API/getProduct.php',
        type: 'get',
        dataType: 'json',
        data:params,
        success:function(data){
            callback&&callback(data);
        }
    });
}