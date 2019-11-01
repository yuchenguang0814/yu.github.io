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
            var key = window.LT.getUrlParam('key');
            $('.lt_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            searchListData({'key':key,'page':1,'size':4},function(data){
                    $('.lt_product').html(template('searchListTemplate',data));
                     that.endPulldownToRefresh();
                     that.refresh(true);
                 });
            }
        },
        up :{
            callback:function(){
                window.page++;
                var that = this;
                var key = window.LT.getUrlParam('key');
                var name = $('.lt_order a.now').attr('data-name');
                var num = $('.lt_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                var params = {'key':key,'page':window.page,'size':4,'num':num,'numName':name};
                searchListData(params,function(data){
                    $('.lt_product').append(template('searchListTemplate',data));
                    if(data.products==null){
                        that.endPullupToRefresh(true);
                    }else{
                        that.endPullupToRefresh();
                    }
                });
            }
        }

      }
    });
    var key =window.LT.getUrlParam('key');
    $('.lt_search input').val(key);
    $('.lt_search a').on('tap',function(){
        var key = $.trim($('input').val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        location.href = 'searchList.html?key='+key;
        addSearchData(key);
    });
     $('.lt_order a').on('tap',function(){
        if(!$(this).hasClass('now')){
            $(this).addClass('now').siblings().removeClass('now').find('span').removeClass("fa-angle-up").addClass("fa-angle-down");
        }else{
            if(!$(this).find('span').hasClass('fa-angle-up')){
            $(this).find('span').removeClass("fa-angle-down").addClass("fa-angle-up");
            }else{
                $(this).find('span').removeClass("fa-angle-up").addClass("fa-angle-down");
            }
        }
         var name = $(this).attr('data-name');
         var num = $(this).find('span').hasClass('fa-angle-up') ? 1 : 2;
         var params = {'key':key,'page':1,'size':4,'num':num,'numName':name};
         searchListData(params,function(data){
            $('.lt_product').html(template('searchListTemplate',data));
         mui('#refreshContainer').pullRefresh().refresh(true);
        });
    });
});
var searchListData = function(params,callback){
    $.ajax({
        url: '/API/searchlist.php',
        type: 'get',
        dataType: 'json',
        data:params,
        success:function(data){
            window.page = data.page;
            callback&&callback(data);
        }
    });
}
var getSearchData = function(){
    return JSON.parse(localStorage.getItem('SearchHistory') || '[]');
}
var addSearchData = function(key){
    var list = getSearchData();
    $.each(list,function(i,item){
        if(item == key){
            list.splice(i,1);
        }
    });
    list.push(key);
    if(list.length > 10){
        list.splice(0,list.length-10);
    }
    localStorage.setItem('SearchHistory',JSON.stringify(list));
}