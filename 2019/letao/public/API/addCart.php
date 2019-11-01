<?php
require_once 'functions.php';
$current = get_current();
$error = '';
if(empty($current)){
    $success = false;
    $error = 404;
}else{
    $userId = $current['id'];
    $size = $_POST['size'];
    $productId = $_POST['productId'];
    $number = $_POST['number'];
    $sql = "INSERT into cart values (null, '{$userId}','{$productId}','{$number}','{$size}','1');";
    $rows = xiu_execute($sql);
    if($rows <= 0){
        $error = 202;
    }else{
        $success =true;
    }
}
header('Content-Type: application/json');
$json = json_encode(array('success'=> $success,'error'=> $error));
echo $json;