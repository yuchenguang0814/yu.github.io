$(function(){
    getFirstCategoryData(function(data){
        $('.cate_left ul').html(template('firstTemplate',data));
        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
        render(categoryId);
        $('.cate_left').on('tap','a',function(){
            if($(this).parent().hasClass('now')) return false;
            $('.cate_left li').removeClass('now');
            $(this).parent().addClass('now');
            render($(this).attr('data-id'));
        });
    });
});
var getFirstCategoryData = function(callback){
        $.ajax({
        url: '/API/getFirstCategory.php',
        type: 'get',
        dataType: 'json',
        data:'',
        success:function(data){
            callback&&callback(data);
        }
    });
}
var getSecondCategoryData = function(params,callback){
        $.ajax({
        url: '/API/getSecondCategory.php',
        type: 'get',
        dataType: 'json',
        data:params,
        success:function(data){
            callback&&callback(data);
        }
    });
}
var render = function(categoryId){
    getSecondCategoryData({'categoryId':categoryId},function(data){
        $('.cate_right ul').html(template('secondTemplate',data));
    });
}