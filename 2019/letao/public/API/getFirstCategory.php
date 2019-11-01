<?php
require_once 'functions.php';
$categories = xiu_fetch_all("SELECT * FROM category;");
header('Content-Type: application/json');
$json = json_encode(array('categories'=> $categories));
echo $json;
 ?>