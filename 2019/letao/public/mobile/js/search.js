$(function(){
    $('.lt_search input').val('');
    $('.lt_history').html(template('searchTemplate',{list: getSearchData()}));
    $('body').on('tap','.lt_search a',function(){
        var key = $.trim($('input').val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        location.href = 'searchList.html?key='+key;
        addSearchData(key);
        return false;
    }).on('tap','.icon_clear',function(){
        localStorage.clear();
        $('.lt_history').html(template('searchTemplate',{list: getSearchData()}));
    }).on('tap','.icon_delete',function(){
          removeSearchData($(this).prev().attr('data-key'));
          $('.lt_history').html(template('searchTemplate',{list: getSearchData()}));
    }).on('tap','[data-key]',function(){
        location.href = 'searchList.html?key='+$(this).attr('data-key');
    });
});
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
var removeSearchData = function(key){
    var list = getSearchData();
    $.each(list,function(i,item){
        if(item == key){
            list.splice(i,1);
        }
    });
    localStorage.setItem('SearchHistory',JSON.stringify(list));

};