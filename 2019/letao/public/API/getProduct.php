<?php
require_once 'functions.php';
$Id = $_GET['productId'];
$sql ="SELECT * FROM product WHERE id = '{$Id}'";
$sql2 = "SELECT * FROM product_picture WHERE productId = '{$Id}'";
$product = xiu_fetch_one($sql);
$product_picture = xiu_fetch_all($sql2);
header('Content-Type: application/json');
$json = json_encode(array('product'=> $product,'picture'=> $product_picture));
echo $json;