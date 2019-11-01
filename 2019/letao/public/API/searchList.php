<?php
require_once 'functions.php';
$key = $_GET['key'];
$where = '1 = 1';
$order = 'product.id asc';
$num =empty($_GET['num'])?2:(int)$_GET['num'];
$numName = empty($_GET['numName'])?'id':$_GET['numName'];
if($num == 1){
     $order = 'product.'.$numName.' asc';
}else if($num == 2){
    $order = 'product.'.$numName.' desc';
}
$page = empty($_GET['page'])?1:(int)$_GET['page'];
$size = empty($_GET['size'])?1:(int)$_GET['size'];
$offset = ($page-1)*$size;
$where .= " and CONCAT(IFNULL(proName,''),IFNULL(price,''),IFNULL(proDesc,''),IFNULL(brandName,'')) LIKE '%".$key."%'";

$sql ="SELECT product.*,
brand.brandName as brandName,
product_picture.picAddr as picAddr
FROM product
INNER JOIN brand
ON product.brandId=brand.id
INNER JOIN product_picture
ON product.id = product_picture.productId
WHERE {$where}
order by {$order}
limit {$offset},{$size}";
$products = xiu_fetch_all($sql);
$total_count = (int)xiu_fetch_one("SELECT count(1) as num From product
INNER JOIN brand
ON product.brandId=brand.id
INNER JOIN product_picture
ON product.id = product_picture.productId
WHERE {$where}")['num'];
$total_page = (int)ceil($total_count/$size);
header('Content-Type: application/json');
$json = json_encode(array('total_page'=> $total_page,'page'=> $page,'products'=> $products));
echo $json;
