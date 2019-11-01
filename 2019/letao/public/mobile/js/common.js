window.LT = {};
LT.serializeToobejct =function(serialize){
  var obj = {};
  if(serialize){
    var arr = serialize.split('&');
    arr.forEach(function(item,i){
      var itemArr = item.split('=');
      obj[itemArr[0]]=itemArr[1];
    });
    return obj;
  }
}
LT.getItemById = function(arr,id){
  var obj = null;
  arr.forEach(function(item,i){
    if(item.id == id){
      obj = item;
    }
  });
  return obj;
}
LT.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
}
LT.loginUrl = '/mobile/user/login.html';
LT.cartUrl = '/mobile/user/cart.html';
LT.indexUrl = '/mobile/user/index.html';
LT.loginAjax = function(params){
    $.ajax({
    url: params.url || '#',
    type: params.type || 'get',
    dataType:params.dataType || 'json',
    data:params.data || '',
    success:function(data){
       if(data.success==false&&data.error ==404){
          mui.toast('您还没有登录');
          setTimeout(function(){
            location.href = LT.loginUrl+'?returnUrl='+location.href;
          },1000);
          return false;
        }else if(data.success==false&&data.error ==202){
          mui.toast('添加购物车失败');
        }
        params.success&&params.success(data);
          //登录成功执行回调函数
    },
    error:function(){
       mui.toast('服务器繁忙');
    }
    });
}
LT.Ajax = function(params){
    $.ajax({
    url: params.url || '#',
    type: params.type || 'get',
    dataType:params.dataType || 'json',
    data:params.data || '',
    success:function(data){
          params.success&&params.success(data);//登录成功执行回调函数
    },
    error:function(){
       mui.toast('服务器繁忙');
    }
    });
}
