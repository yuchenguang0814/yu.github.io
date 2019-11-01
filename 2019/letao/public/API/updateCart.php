<?php
require_once 'functions.php';
$current = get_current();
$error = '';
if(empty($current)){
    $success = false;
    $error = 404;
}else{
    $size = $_POST['size'];
    $number = $_POST['number'];
    $id = $_POST['id'];
    $sql = "UPDATE cart SET size = '{$size}', num = '{$number}'
    WHERE id = '{$id}';";
    $row = xiu_execute($sql);
    if($row <= 0){
        $error = 202;
    }else{
        $success =true;
    }
}
header('Content-Type: application/json');
$json = json_encode(array('success'=> $success,'error'=> $error));
echo $json;
