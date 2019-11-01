<?php
require_once 'functions.php';
$categoryId = $_GET['categoryId'];
$brand = xiu_fetch_all("SELECT * FROM brand Where categoryId = '{$categoryId}';");
header('Content-Type: application/json');
$json = json_encode(array('brand'=> $brand));
echo $json;
 ?>
