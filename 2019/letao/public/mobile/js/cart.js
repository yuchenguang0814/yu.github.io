$(function(){
    mui('.mui-scroll-wrapper').scroll({
         indicators: false,
    });
    mui.init({
        pullRefresh : {
        container:"#refreshContainer",
        down : {
        auto:true,
        callback:function(){
            var that = this;
            var params ={'url':'/API/queryCartPaging.php','type':'get','success':function(data){
                window.cart = data;
                $('.mui-table-view').html(template('cart',data));
                that.endPulldownToRefresh();
                }};
            window.LT.loginAjax(params);
            }
        }
        }
    });
 $('.right span').on('tap',function(){
    mui('#refreshContainer').pullRefresh().pulldownLoading();
 });
 $('.mui-table-view').on('tap','.mui-icon-compose',function(){
        var id = $(this).parent().attr('data-id');
        var cart = window.LT.getItemById(window.cart.carts,id);
        var html = template('edit',cart);
        mui.confirm(html.replace(/\n/g,''), '商品编辑', ['是', '否'],  function(e) {
            if (e.index == 0) {
            var size = $('.btn_size.now').html();
            var number = $('.p_number input').val();
            var params ={'url':'/API/updateCart.php','type':'post','data':{'size':size,'number':number,'id':id},'success':function(data){
                    mui('#refreshContainer').pullRefresh().pulldownLoading();
                }};
            window.LT.loginAjax(params);
            } else {
                //TODO
            }

        })
 });
    $('body').on('tap','.btn_size',function () {
        $(this).addClass('now').siblings().removeClass('now');
    }).on('tap','.p_number span',function () {
        var $input = $(this).siblings('input');
        var currNum = $input.val();
        var maxNum = parseInt($input.attr('data-max'));
        if ($(this).hasClass('jian')) {
            if(currNum <= 1){
                mui.toast('至少一件商品');
                return false;
            }
            currNum--;
        } else {
            if(currNum >= maxNum){
                setTimeout(function () {
                    mui.toast('库存不足');
                },100);
                return false;
            }
            currNum++;
        }
        $input.val(currNum);
    });
});