<?php
require_once 'functions.php';
$current = get_current();
$error = '';
$carts ='';
if(empty($current)){
    $success = false;
    $error = 404;
}else{
    $success = true;
    $userId = $current['id'];
    $sql = "
    SELECT cart.id as id,
    cart.size as size,
    cart.num as num,
    product.proName,
    product.oldPrice,
    product.price,
    product.size as prosize,
    product.num as pronum,
    product_picture.picAddr
    FROM user
    INNER JOIN cart
    ON user.id=cart.userId
    INNER JOIN product
    ON cart.productId=product.id
    INNER JOIN product_picture
    ON cart.productId = product_picture.productId
    where user.id = '{$userId}'
    group by cart.id;";
    $carts = xiu_fetch_all($sql);

}
header('Content-Type: application/json');
$json = json_encode(array('success'=> $success,'carts'=> $carts,'error'=> $error));
echo $json;
